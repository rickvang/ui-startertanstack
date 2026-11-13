import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

export const messageAgentGuidance = {
    goal: "Show a result next to the work that caused it. The page stays usable.",
    when: [
        "A note about something that just happened, next to that work.",
        "Settings, account, and other modules use Message for a saved or removed result.",
    ],
    avoid: [
        "An empty container — use Empty state inside the panel.",
        "A field that failed — use Field; the error sits with the field.",
        "A row status — use Badge.",
        "A table that failed to load — use Table error; the header stays.",
        "A note about the whole page — use Banner.",
        "A brief notice after leaving the work — use Toast.",
    ],
    decisions: [
        {
            title: "Still on the work vs left the work",
            choose: "Message next to the work while the person is still there.",
            insteadOf: "Toast over the page for an in-place result.",
        },
        {
            title: "Page-wide vs local",
            choose: "Banner for a note about the whole page that should stay.",
            insteadOf: "Message when the note is not tied to one local action.",
        },
    ],
} as const satisfies AgentGuidance;

export const bannerAgentGuidance = {
    goal: "Place a page-level note at the top of the work that stays until the condition ends or the person dismisses it.",
    when: ["A note about the whole page, not one field.", "The note should stay until the condition ends, or until the person closes it."],
    avoid: [
        "A result next to the work that caused it — use Message.",
        "A brief notice after leaving that work — use Toast.",
        "A yes or no — use Dialog.",
    ],
} as const satisfies AgentGuidance;

export const toastAgentGuidance = {
    goal: "Show a brief notice after the person has left the work. The page stays usable.",
    when: ["A brief result after the person has left the work.", "The page should stay usable."],
    avoid: [
        "A result next to the work that caused it — use Message.",
        "A page-level note that should stay — use Banner.",
        "A yes or no, or a short form the page must wait for — use Dialog.",
    ],
    decisions: [
        {
            title: "Placement",
            choose: "Bottom of the screen, or top right — pick one placement for the product.",
            insteadOf: "Mixing placements without a product rule.",
        },
    ],
} as const satisfies AgentGuidance;

export const emptyStateAgentGuidance = {
    goal: "Fill an empty content container with a title, explanation, and optional action.",
    when: ["The container has no items yet.", "Invite or create is the next useful step."],
    avoid: [
        "An empty table with no sentence — set Table empty copy.",
        "A failed load — use Message or Table error, not Empty state.",
        "A field error — use Field.",
    ],
    decisions: [
        {
            title: "Action or not",
            choose: "Include an action when the person can create or invite from here.",
            insteadOf: "A decorative empty block with no path forward when one exists.",
        },
    ],
} as const satisfies AgentGuidance;

export const placeholderAgentGuidance = {
    goal: "Reserve space for content that is not ready yet without implying an empty collection.",
    when: ["Layout needs a stand-in while media or copy loads."],
    avoid: ["No items in a list or panel — use Empty state.", "A failed request — use Message or Table error."],
} as const satisfies AgentGuidance;
