import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

export const anchorAgentGuidance = {
    goal: "Jump between sections on the same page.",
    when: ["The page has named sections the person should jump between.", "The sections stay on one scrollable surface."],
    avoid: ["Product area switching — use Shell navigation.", "Parent path of the current page — use Breadcrumb.", "Peer panels that replace each other — use Tabs."],
} as const satisfies AgentGuidance;

export const breadcrumbAgentGuidance = {
    goal: "Show the path inside the current area with the current page strongest.",
    when: ["Quiet ancestors, then the current page.", "Depth is more than one level inside an area."],
    avoid: ["A second product menu in the header.", "Same-page section jumps — use Anchor.", "Switching product domains — use Menu in Shell."],
} as const satisfies AgentGuidance;

export const tabsAgentGuidance = {
    goal: "Switch weakly related parts of one record or view without leaving the page.",
    when: ["Parts are weakly related, such as profile, access, and activity.", "The person should see which tab is current while the mark moves."],
    avoid: ["A linear process — use Steps.", "Top-level product areas — use Shell navigation.", "A route change — use the shell."],
    decisions: [
        {
            title: "Peers vs ordered stages",
            choose: "Tabs for weakly related peer panels.",
            insteadOf: "Steps when the work has a required order.",
        },
    ],
} as const satisfies AgentGuidance;

export const stepsAgentGuidance = {
    goal: "Show a linear process on one record with the decision beside the work.",
    when: ["The record has a process with ordered stages.", "The person should see progress without leaving the page."],
    avoid: ["Weakly related sections with no order — use Tabs.", "A multi-page create flow — use Wizard.", "Top-level product areas — use Shell navigation."],
} as const satisfies AgentGuidance;

export const dropdownAgentGuidance = {
    goal: "Offer a list of actions from one control.",
    when: ["A list of actions only.", "Secondary commands that should stay out of the primary bar."],
    avoid: ["A small task panel with fields — use Popover.", "Primary navigation — use Menu or Shell.", "Choosing one value for a form — use Select."],
} as const satisfies AgentGuidance;

export const menuAgentGuidance = {
    goal: "Present a structured set of destinations or commands in a menu surface.",
    when: ["A structured menu of destinations or commands.", "Shell side navigation that changes the page while chrome stays."],
    avoid: ["A single row of actions from one button — use Dropdown.", "Section jumps on one page — use Anchor.", "Weakly related peer panels — use Tabs."],
    decisions: [
        {
            title: "Destinations vs actions",
            choose: "Menu for destinations with a current value.",
            insteadOf: "Dropdown for a short action list from one button.",
        },
    ],
} as const satisfies AgentGuidance;

export const paginationAgentGuidance = {
    goal: "Page through a long set when virtualization is not the product choice.",
    when: ["Too many parents to show at once and the product prefers pages.", "The person needs a stable page address for a slice of the list."],
    avoid: ["Short lists — omit pagination.", "Steady-height infinite scroll preference — consider Table virtualize.", "Filtering that shrinks the set — show Empty state when nothing matches."],
} as const satisfies AgentGuidance;
