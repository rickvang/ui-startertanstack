import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

export const contentContainersAgentGuidance = {
    goal: "Pick a content container from how the block relates to the page — not from decoration.",
    cases: [
        { name: "Panel", when: "A region of the page that holds related work.", use: "Panel." },
        { name: "Card", when: "A self-contained unit the person can scan among peers.", use: "Card." },
        { name: "Empty", when: "The container has no items yet.", use: "Empty state inside the container." },
        { name: "Metrics", when: "A few key numbers with optional trend.", use: "Metrics composition." },
        { name: "Key-value", when: "Labeled facts for one record.", use: "Key-value composition." },
        { name: "Article row / grid", when: "Editorial cards in a row or grid.", use: "Article row or Article grid." },
    ],
    avoid: ["Wrapping every block in a Card when a Panel or bare Stack is enough.", "Using Empty state outside the empty container."],
} as const satisfies AgentGuidance;
