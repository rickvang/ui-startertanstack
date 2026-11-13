import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

export const anchorAgentGuidance = {
    goal: "Jump between sections on the same page.",
    when: ["The page has named sections the person should jump between."],
    avoid: ["Product area switching — use Shell navigation.", "Parent path of the current page — use Breadcrumb."],
} as const satisfies AgentGuidance;

export const breadcrumbAgentGuidance = {
    goal: "Show the path inside the current area with the current page strongest.",
    when: ["Quiet ancestors, then the current page."],
    avoid: ["A second product menu in the header.", "Same-page section jumps — use Anchor."],
} as const satisfies AgentGuidance;

export const tabsAgentGuidance = {
    goal: "Switch weakly related parts of one record or view without leaving the page.",
    when: ["Parts are weakly related, such as profile, access, and activity."],
    avoid: ["A linear process — use Steps.", "Top-level product areas — use Shell navigation."],
} as const satisfies AgentGuidance;

export const stepsAgentGuidance = {
    goal: "Show a linear process on one record with the decision beside the work.",
    when: ["The record has a process with ordered stages."],
    avoid: ["Weakly related sections with no order — use Tabs.", "A multi-page create flow — use Wizard."],
} as const satisfies AgentGuidance;

export const dropdownAgentGuidance = {
    goal: "Offer a list of actions from one control.",
    when: ["A list of actions only."],
    avoid: ["A small task panel with fields — use Popover.", "Primary navigation — use Menu or Shell."],
} as const satisfies AgentGuidance;

export const menuAgentGuidance = {
    goal: "Present a structured set of destinations or commands in a menu surface.",
    when: ["A structured menu of destinations or commands."],
    avoid: ["A single row of actions from one button — use Dropdown.", "Section jumps on one page — use Anchor."],
} as const satisfies AgentGuidance;

export const paginationAgentGuidance = {
    goal: "Page through a long set when virtualization is not the product choice.",
    when: ["Too many parents to show at once and the product prefers pages."],
    avoid: ["Short lists — omit pagination.", "Steady-height infinite scroll preference — consider Table virtualize."],
} as const satisfies AgentGuidance;
