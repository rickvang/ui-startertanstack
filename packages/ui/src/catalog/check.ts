#!/usr/bin/env bun
/**
 * Freshness + vibe fitness checks for the catalog index.
 *
 *   bun run catalog:check
 */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCatalogIndex } from "./build-index";
import type { CatalogEntry } from "./types";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(here, "../..");
const repoRoot = join(packageRoot, "../..");
const committedPath = join(here, "catalog-index.json");
const vibePath = join(repoRoot, "fixtures/vibe-prompts.json");

type VibeFixture = {
    version: number;
    prompts: readonly {
        id: string;
        prompt: string;
        expect: readonly string[];
    }[];
};

/** Expect tokens are catalog ids (exact). Alternatives use ` or `. */
function expectIdsPresent(
    entries: readonly CatalogEntry[],
    expectToken: string,
): boolean {
    const ids = new Set(entries.map((entry) => entry.id));
    const alternatives = expectToken
        .split(/\s+or\s+/i)
        .map((part) => part.trim().toLowerCase())
        .filter(Boolean);
    if (alternatives.length === 0) return true;
    return alternatives.some((id) => ids.has(id));
}

async function checkFreshness(entries: CatalogEntry[]) {
    const built = {
        version: 1 as const,
        generatedAt: "COMPARE",
        entries,
    };
    const committed = JSON.parse(await readFile(committedPath, "utf8")) as {
        version: number;
        entries: CatalogEntry[];
    };
    const builtBody = JSON.stringify({ version: built.version, entries: built.entries });
    const committedBody = JSON.stringify({
        version: committed.version,
        entries: committed.entries,
    });
    if (builtBody !== committedBody) {
        console.error(
            "catalog-index.json is stale. Run `bun run catalog:build` and commit the result.",
        );
        process.exit(1);
    }
    console.log(`freshness: ok (${entries.length} entries)`);
}

async function checkVibes(entries: CatalogEntry[]) {
    const fixture = JSON.parse(await readFile(vibePath, "utf8")) as VibeFixture;
    let failed = 0;
    for (const prompt of fixture.prompts) {
        const misses = prompt.expect.filter(
            (token) => !expectIdsPresent(entries, token),
        );
        if (misses.length > 0) {
            failed += 1;
            console.error(`vibe ${prompt.id}: missing ${misses.join(" | ")}`);
            continue;
        }
        console.log(`vibe ${prompt.id}: ok`);
    }
    if (failed > 0) {
        console.error(`vibe: ${failed} prompt(s) failed`);
        process.exit(1);
    }
    console.log(`vibe: ok (${fixture.prompts.length} prompts)`);
}

async function main() {
    const index = await buildCatalogIndex();
    // Rebuild without timestamps for compare — use in-memory entries vs committed entries.
    await checkFreshness(index.entries);
    await checkVibes(index.entries);
}

await main();
