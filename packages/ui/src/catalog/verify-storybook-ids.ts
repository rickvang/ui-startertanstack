#!/usr/bin/env bun
/**
 * Compare catalog storyIds to a Storybook index.json (after build-storybook).
 *
 *   bun run build-storybook && bun run catalog:verify-ids
 */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCatalogIndex } from "./load";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(here, "../..");
const defaultIndex = join(packageRoot, "storybook-static/index.json");

type StorybookIndex = {
    entries?: Record<string, { id?: string; type?: string }>;
    stories?: Record<string, { id?: string }>;
};

async function main() {
    const path = process.argv[2] ?? defaultIndex;
    const raw = await readFile(path, "utf8");
    const sb = JSON.parse(raw) as StorybookIndex;
    const ids = new Set(
        Object.values(sb.entries ?? sb.stories ?? {})
            .map((entry) => entry.id)
            .filter((id): id is string => Boolean(id)),
    );
    if (ids.size === 0) {
        console.error(`No story ids in ${path}`);
        process.exit(1);
    }

    const catalog = await loadCatalogIndex();
    const missing = catalog.entries.filter((entry) => !ids.has(entry.storyId));
    if (missing.length > 0) {
        console.error(`catalog storyIds missing from Storybook (${missing.length}):`);
        for (const entry of missing.slice(0, 20)) {
            console.error(`  ${entry.id} → ${entry.storyId}`);
        }
        process.exit(1);
    }
    console.log(`verify-ids: ok (${catalog.entries.length} matched against ${ids.size} Storybook entries)`);
}

await main();
