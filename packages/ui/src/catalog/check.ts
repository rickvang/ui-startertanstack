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
import { searchCatalog } from "./search";
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

function normalizeExpect(token: string): string[] {
    return token
        .toLowerCase()
        .split(/\s+or\s+|\/|,/)
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) =>
            part
                .replace(/\bpatterns?\b/g, "")
                .replace(/\bstory\b/g, "")
                .replace(/\s+/g, " ")
                .trim(),
        )
        .filter(Boolean);
}

function expectHits(
    entries: readonly CatalogEntry[],
    expectToken: string,
): boolean {
    const needles = normalizeExpect(expectToken);
    if (needles.length === 0) return true;
    return needles.some((needle) => {
        const byId = entries.some(
            (entry) =>
                entry.id === needle ||
                entry.id.includes(needle.replace(/\s+/g, "-")),
        );
        if (byId) return true;
        const hits = searchCatalog(entries, needle, { limit: 5 });
        return hits.length > 0;
    });
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
        const misses = prompt.expect.filter((token) => !expectHits(entries, token));
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
