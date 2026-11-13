import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

export const buttonAgentGuidance = {
    goal: "Pick a button variant from how primary the action is, not from color taste.",
    cases: [
        { name: "Primary", when: "The one main action in the region.", use: "variant primary (default)." },
        { name: "Secondary", when: "A supporting action beside the primary.", use: "variant secondary." },
        { name: "Ghost", when: "A quiet action in a dense tool chrome.", use: "variant ghost." },
        { name: "Danger", when: "A destructive confirm the person must notice.", use: "variant danger." },
        { name: "Disabled", when: "The action is unavailable and should stay visible.", use: "disabled." },
        { name: "Wide / Dense", when: "Layout needs full width or tighter padding.", use: "wide or dense props." },
    ],
    avoid: ["Multiple primary buttons in one region.", "Using danger for ordinary navigation."],
} as const satisfies AgentGuidance;

export const fieldAgentGuidance = {
    goal: "Bind a control to a label, help, and error that stay with the field.",
    when: ["A form control needs label, description, or validation next to it."],
    avoid: ["Page-level results — use Message or Banner.", "Table cell editing — use a record pattern."],
} as const satisfies AgentGuidance;

export const badgeAgentGuidance = {
    goal: "Show a compact status or category on a row or header.",
    when: ["A row or entity status that must stay scannable."],
    avoid: ["A paragraph of feedback — use Message.", "A page-wide notice — use Banner."],
} as const satisfies AgentGuidance;
