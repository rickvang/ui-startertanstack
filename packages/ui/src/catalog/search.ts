import type { CatalogEntry, CatalogKind } from "./types";

export type CatalogSearchOptions = {
    kind?: CatalogKind;
    limit?: number;
};

function haystack(entry: CatalogEntry): string {
    const parts = [
        entry.id,
        entry.title,
        entry.storyTitle,
        entry.storyName,
        entry.kind,
        ...entry.keywords,
        entry.agent.goal,
        ...(entry.agent.when ?? []),
        ...(entry.agent.avoid ?? []),
        ...(entry.agent.cases?.flatMap((item) => [
            item.name,
            item.when,
            item.use,
            item.avoid ?? "",
        ]) ?? []),
        ...(entry.agent.decisions?.flatMap((item) => [
            item.title,
            item.choose,
            item.insteadOf ?? "",
        ]) ?? []),
    ];
    return parts.join("\n").toLowerCase();
}

function scoreEntry(entry: CatalogEntry, terms: string[]): number {
    const text = haystack(entry);
    let score = 0;
    for (const term of terms) {
        if (!term) continue;
        if (entry.id === term) score += 100;
        else if (entry.id.includes(term)) score += 40;
        if (entry.keywords.some((keyword) => keyword.toLowerCase() === term)) {
            score += 30;
        } else if (
            entry.keywords.some((keyword) =>
                keyword.toLowerCase().includes(term),
            )
        ) {
            score += 12;
        }
        if (entry.title.toLowerCase() === term) score += 25;
        if (text.includes(term)) score += 8;
    }
    return score;
}

export function searchCatalog(
    entries: readonly CatalogEntry[],
    query: string,
    options: CatalogSearchOptions = {},
): CatalogEntry[] {
    const terms = query
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    const limit = options.limit ?? 20;

    let pool = entries.slice();
    if (options.kind) {
        pool = pool.filter((entry) => entry.kind === options.kind);
    }

    if (terms.length === 0) {
        return pool.slice(0, limit);
    }

    return pool
        .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
        .filter((row) => row.score > 0)
        .sort((a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id))
        .slice(0, limit)
        .map((row) => row.entry);
}

export function getCatalogEntry(
    entries: readonly CatalogEntry[],
    id: string,
): CatalogEntry | undefined {
    const needle = id.trim().toLowerCase();
    return entries.find((entry) => entry.id === needle);
}

export function listCatalog(
    entries: readonly CatalogEntry[],
    options: CatalogSearchOptions = {},
): CatalogEntry[] {
    let pool = entries.slice();
    if (options.kind) {
        pool = pool.filter((entry) => entry.kind === options.kind);
    }
    pool.sort((a, b) => a.id.localeCompare(b.id));
    return options.limit ? pool.slice(0, options.limit) : pool;
}
