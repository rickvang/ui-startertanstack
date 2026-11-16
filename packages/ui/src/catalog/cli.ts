#!/usr/bin/env bun
/**
 * Catalog CLI for agents.
 *
 *   bun run catalog search <query> [--kind pattern] [--limit 10] [--dense]
 *   bun run catalog get <id> [--dense]
 *   bun run catalog list [--kind component] [--limit 50] [--dense]
 */
import { denseEntry, denseIndex } from "./dense";
import { loadCatalogIndex } from "./load";
import { getCatalogEntry, listCatalog, searchCatalog } from "./search";
import type { CatalogKind } from "./types";

const KINDS = new Set<CatalogKind>([
    "docs",
    "foundation",
    "layout",
    "component",
    "module",
    "pattern",
]);

function usage(): never {
    console.log(`Usage:
  bun run catalog search <query> [--kind <kind>] [--limit <n>] [--dense]
  bun run catalog get <id> [--dense]
  bun run catalog list [--kind <kind>] [--limit <n>] [--dense]

Kinds: ${[...KINDS].join(", ")}`);
    process.exit(1);
}

function takeFlag(args: string[], name: string): boolean {
    const index = args.indexOf(name);
    if (index === -1) return false;
    args.splice(index, 1);
    return true;
}

function takeOption(args: string[], name: string): string | undefined {
    const index = args.indexOf(name);
    if (index === -1) return undefined;
    const value = args[index + 1];
    if (!value || value.startsWith("-")) {
        console.error(`Missing value for ${name}`);
        process.exit(1);
    }
    args.splice(index, 2);
    return value;
}

function parseKind(value: string | undefined): CatalogKind | undefined {
    if (!value) return undefined;
    if (!KINDS.has(value as CatalogKind)) {
        console.error(`Unknown kind: ${value}`);
        process.exit(1);
    }
    return value as CatalogKind;
}

function printJson(value: unknown) {
    console.log(JSON.stringify(value, null, 2));
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) usage();

    const command = args.shift();
    const dense = takeFlag(args, "--dense");
    const kind = parseKind(takeOption(args, "--kind"));
    const limitRaw = takeOption(args, "--limit");
    const limit = limitRaw ? Number(limitRaw) : undefined;
    if (limitRaw && (!Number.isFinite(limit) || (limit ?? 0) < 1)) {
        console.error("Invalid --limit");
        process.exit(1);
    }

    const index = await loadCatalogIndex();

    switch (command) {
        case "search": {
            const query = args.join(" ").trim();
            if (!query) usage();
            const hits = searchCatalog(index.entries, query, { kind, limit: limit ?? 20 });
            if (dense) {
                console.log(denseIndex(hits));
            } else {
                printJson(
                    hits.map((entry) => ({
                        id: entry.id,
                        kind: entry.kind,
                        title: entry.title,
                        storyTitle: entry.storyTitle,
                        storyName: entry.storyName,
                        storyId: entry.storyId,
                        goal: entry.agent.goal,
                    })),
                );
            }
            break;
        }
        case "get": {
            const id = args[0];
            if (!id || args.length > 1) usage();
            const entry = getCatalogEntry(index.entries, id);
            if (!entry) {
                console.error(`Not found: ${id}`);
                process.exit(1);
            }
            if (dense) console.log(denseEntry(entry));
            else printJson(entry);
            break;
        }
        case "list": {
            if (args.length > 0) usage();
            const rows = listCatalog(index.entries, { kind, limit });
            if (dense) console.log(denseIndex(rows));
            else {
                printJson(
                    rows.map((entry) => ({
                        id: entry.id,
                        kind: entry.kind,
                        title: entry.title,
                        storyId: entry.storyId,
                    })),
                );
            }
            break;
        }
        default:
            usage();
    }
}

await main();
