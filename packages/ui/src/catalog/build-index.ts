#!/usr/bin/env bun
/**
 * Scan *.agent.ts + *.stories.tsx and write catalog-index.json.
 * Run from packages/ui: `bun run catalog:build`
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { AgentGuidance } from "../../.storybook/addons/agent/types";
import { catalogSlug, storybookStoryId } from "./story-id";
import type { CatalogEntry, CatalogIndex, CatalogKind } from "./types";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(here, "../..");
const srcRoot = join(packageRoot, "src");
const outPath = join(packageRoot, "src/catalog/catalog-index.json");

async function walk(dir: string, match: (name: string) => boolean): Promise<string[]> {
    const out: string[] = [];
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "node_modules" || entry.name === "dist") continue;
            out.push(...(await walk(path, match)));
            continue;
        }
        if (match(entry.name)) out.push(path);
    }
    return out;
}

function camelToKebab(value: string): string {
    return catalogSlug(
        value
            .replace(/AgentGuidance$/, "")
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2"),
    );
}

function kindFromTitle(title: string): CatalogKind {
    const root = title.split("/")[0]?.toLowerCase() ?? "";
    switch (root) {
        case "getting started":
            return "docs";
        case "foundations":
            return "foundation";
        case "layout":
            return "layout";
        case "components":
            return "component";
        case "modules":
            return "module";
        case "patterns":
            return "pattern";
        default:
            return "component";
    }
}

function isAgentGuidance(value: unknown): value is AgentGuidance {
    return (
        typeof value === "object" &&
        value !== null &&
        "goal" in value &&
        typeof (value as { goal: unknown }).goal === "string"
    );
}

function uniqueKeywords(values: readonly string[]): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const raw of values) {
        const value = raw.trim().toLowerCase();
        if (!value || seen.has(value)) continue;
        seen.add(value);
        out.push(value);
    }
    return out;
}

function deriveKeywords(
    id: string,
    title: string,
    storyTitle: string,
    storyName: string,
    agent: AgentGuidance,
): string[] {
    const fromTitle = storyTitle
        .split("/")
        .flatMap((part) => part.split(/\s+/))
        .map((part) => catalogSlug(part))
        .filter(Boolean);
    const fromGoal = agent.goal
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((token) => token.length > 3)
        .slice(0, 12);
    return uniqueKeywords([
        id,
        catalogSlug(title),
        catalogSlug(storyName),
        ...fromTitle,
        ...(agent.keywords ?? []),
        ...fromGoal,
    ]);
}

type StoryHit = {
    file: string;
    title: string;
    agentExport: string;
    storyExport: string;
    storyName: string;
};

function parseStoryFile(file: string, source: string): StoryHit | null {
    const titleMatches = [...source.matchAll(/title:\s*["']([^"']+)["']/g)].map(
        (match) => match[1]!,
    );
    // Prefer Storybook paths (`Group/Leaf`); ignore demo copy titles earlier in the file.
    const title =
        titleMatches.find((value) => value.includes("/")) ?? titleMatches[0];
    const agentMatch = source.match(/\bagent:\s*([A-Za-z0-9_]+)/);
    if (!title || !agentMatch) return null;

    const storyBlocks = [
        ...source.matchAll(
            /export const ([A-Za-z0-9_]+):\s*Story\s*=\s*\{([\s\S]*?)\n\};/g,
        ),
    ];
    if (storyBlocks.length === 0) return null;

    const first = storyBlocks[0]!;
    const storyExport = first[1]!;
    const body = first[2]!;
    const nameMatch = body.match(/\bname:\s*["']([^"']+)["']/);
    const storyName = nameMatch?.[1] ?? storyExport.replace(/Story$/, "");

    return {
        file,
        title,
        agentExport: agentMatch[1]!,
        storyExport,
        storyName,
    };
}

async function loadGuidanceMap(): Promise<Map<string, AgentGuidance>> {
    const files = await walk(srcRoot, (name) => name.endsWith(".agent.ts"));
    const map = new Map<string, AgentGuidance>();
    for (const file of files) {
        const mod = (await import(pathToFileURL(file).href)) as Record<
            string,
            unknown
        >;
        for (const [key, value] of Object.entries(mod)) {
            if (!key.endsWith("AgentGuidance")) continue;
            if (!isAgentGuidance(value)) continue;
            map.set(key, value);
        }
    }
    return map;
}

export async function buildCatalogIndex(): Promise<CatalogIndex> {
    const guidance = await loadGuidanceMap();
    const storyFiles = await walk(srcRoot, (name) => name.endsWith(".stories.tsx"));
    const entries: CatalogEntry[] = [];
    const usedIds = new Set<string>();

    for (const file of storyFiles.sort()) {
        const source = await readFile(file, "utf8");
        const hit = parseStoryFile(file, source);
        if (!hit) continue;

        const agent = guidance.get(hit.agentExport);
        if (!agent) {
            console.warn(`No guidance for ${hit.agentExport} in ${relative(packageRoot, file)}`);
            continue;
        }

        let id = camelToKebab(hit.agentExport);
        if (usedIds.has(id)) {
            id = `${id}-${catalogSlug(hit.storyName)}`;
        }
        if (usedIds.has(id)) {
            throw new Error(`Duplicate catalog id: ${id}`);
        }
        usedIds.add(id);

        const titleLeaf = hit.title.split("/").pop() ?? hit.title;
        const displayTitle =
            hit.title === "Modules/Table" || hit.title === "Layout/Overlays"
                ? hit.storyName
                : titleLeaf;

        entries.push({
            id,
            kind: kindFromTitle(hit.title),
            title: displayTitle,
            storyTitle: hit.title,
            storyName: hit.storyName,
            storyId: storybookStoryId(hit.title, hit.storyName),
            source: relative(packageRoot, file).replaceAll("\\", "/"),
            keywords: deriveKeywords(id, displayTitle, hit.title, hit.storyName, agent),
            agent: {
                goal: agent.goal,
                when: agent.when ? [...agent.when] : undefined,
                avoid: agent.avoid ? [...agent.avoid] : undefined,
                cases: agent.cases ? agent.cases.map((item) => ({ ...item })) : undefined,
                decisions: agent.decisions
                    ? agent.decisions.map((item) => ({ ...item }))
                    : undefined,
                keywords: agent.keywords ? [...agent.keywords] : undefined,
            },
        });
    }

    entries.sort((a, b) => a.id.localeCompare(b.id));

    return {
        version: 1,
        generatedAt: new Date().toISOString(),
        entries,
    };
}

async function main() {
    const index = await buildCatalogIndex();
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, `${JSON.stringify(index, null, 2)}\n`, "utf8");
    console.log(`Wrote ${index.entries.length} entries → ${relative(packageRoot, outPath)}`);
}

if (import.meta.main) {
    await main();
}
