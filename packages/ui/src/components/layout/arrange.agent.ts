import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

export const flexAgentGuidance = {
    goal: "Lay out items on one line with shared alignment.",
    when: ["Items stay on one line."],
    avoid: ["Inline items should wrap — use Space.", "Blocks stack vertically — use Stack."],
} as const satisfies AgentGuidance;

export const spaceAgentGuidance = {
    goal: "Lay out inline items that may wrap onto the next line.",
    when: ["Inline items should wrap onto the next line.", "A row of actions that may not fit."],
    avoid: ["Items stay on one line — use Flex.", "Blocks stack vertically — use Stack."],
} as const satisfies AgentGuidance;

export const stackAgentGuidance = {
    goal: "Stack blocks vertically with the parent owning the gap.",
    when: ["Blocks sit one under another.", "The parent owns the gap. The children do not add their own margin."],
    avoid: ["Items stay on one line — use Flex.", "Inline items should wrap — use Space."],
} as const satisfies AgentGuidance;

export const gridAgentGuidance = {
    goal: "Place equal columns of the same kind of block.",
    when: ["Equal columns of the same kind of block."],
    avoid: ["Uneven blocks that pack — use Masonry.", "Two resizable panes — use Splitter."],
} as const satisfies AgentGuidance;

export const splitterAgentGuidance = {
    goal: "Split the view into two resizable panes.",
    when: ["A list beside its details.", "The person should be able to resize the two panes."],
    avoid: ["Equal columns of the same kind of block — use Grid.", "Uneven blocks that pack — use Masonry."],
} as const satisfies AgentGuidance;

export const masonryAgentGuidance = {
    goal: "Pack uneven blocks into columns instead of one aligned row.",
    when: ["Blocks are uneven.", "They should pack into columns instead of lining up on one row."],
    avoid: ["Equal columns of the same kind of block — use Grid.", "Two resizable panes — use Splitter."],
} as const satisfies AgentGuidance;

export const dividerAgentGuidance = {
    goal: "Separate regions with a quiet rule, not a card boundary.",
    when: ["Two regions need a visual break without becoming separate cards."],
    avoid: ["Wrapping every block in a Card just to separate them."],
} as const satisfies AgentGuidance;
