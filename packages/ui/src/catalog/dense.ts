import type { CatalogEntry } from "./types";

/** Compact text export for agent context windows. */
export function denseEntry(entry: CatalogEntry): string {
    const lines = [
        `# ${entry.id}`,
        `kind: ${entry.kind}`,
        `title: ${entry.title}`,
        `story: ${entry.storyTitle} / ${entry.storyName}`,
        `storyId: ${entry.storyId}`,
        `source: ${entry.source}`,
        `keywords: ${entry.keywords.join(", ") || "(none)"}`,
        "",
        `goal: ${entry.agent.goal}`,
    ];

    if (entry.agent.when?.length) {
        lines.push("", "when:");
        for (const item of entry.agent.when) {
            lines.push(`- ${item}`);
        }
    }

    if (entry.agent.avoid?.length) {
        lines.push("", "avoid:");
        for (const item of entry.agent.avoid) {
            lines.push(`- ${item}`);
        }
    }

    if (entry.agent.cases?.length) {
        lines.push("", "cases:");
        for (const item of entry.agent.cases) {
            lines.push(`- ${item.name}: ${item.when}`);
            lines.push(`  use: ${item.use}`);
            if (item.avoid) {
                lines.push(`  avoid: ${item.avoid}`);
            }
            if (item.next) {
                lines.push(`  next: ${item.next}`);
            }
        }
    }

    if (entry.agent.decisions?.length) {
        lines.push("", "decisions:");
        for (const item of entry.agent.decisions) {
            lines.push(`- ${item.title}`);
            lines.push(`  choose: ${item.choose}`);
            if (item.insteadOf) {
                lines.push(`  insteadOf: ${item.insteadOf}`);
            }
        }
    }

    return `${lines.join("\n")}\n`;
}

export function denseIndex(entries: readonly CatalogEntry[]): string {
    return entries.map((entry) => denseEntry(entry)).join("\n---\n\n");
}
