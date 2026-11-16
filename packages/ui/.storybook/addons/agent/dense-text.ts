import type { AgentGuidance } from "./types";

/** Dense text for the Agent panel copy control (mirrors catalog dense export). */
export function denseGuidance(guidance: AgentGuidance, title?: string): string {
    const lines = [
        title ? `# ${title}` : "# agent",
        "",
        `goal: ${guidance.goal}`,
    ];

    if (guidance.when?.length) {
        lines.push("", "when:");
        for (const item of guidance.when) lines.push(`- ${item}`);
    }
    if (guidance.avoid?.length) {
        lines.push("", "avoid:");
        for (const item of guidance.avoid) lines.push(`- ${item}`);
    }
    if (guidance.cases?.length) {
        lines.push("", "cases:");
        for (const item of guidance.cases) {
            lines.push(`- ${item.name}: ${item.when}`);
            lines.push(`  use: ${item.use}`);
            if (item.avoid) lines.push(`  avoid: ${item.avoid}`);
            if (item.next) lines.push(`  next: ${item.next}`);
        }
    }
    if (guidance.decisions?.length) {
        lines.push("", "decisions:");
        for (const item of guidance.decisions) {
            lines.push(`- ${item.title}`);
            lines.push(`  choose: ${item.choose}`);
            if (item.insteadOf) lines.push(`  insteadOf: ${item.insteadOf}`);
        }
    }
    return `${lines.join("\n")}\n`;
}
