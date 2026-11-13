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
    when: ["A custom control needs the same label, hint, and error chrome as Text field.", "You are composing layout around a control the catalog does not wrap yet."],
    avoid: ["A single-line text value — use Text field.", "A known list of options — use Select or Radio.", "Page-level results — use Message or Banner."],
    decisions: [
        {
            title: "Wrapped control vs Field shell",
            choose: "Prefer Text field, Select, and siblings that already wrap Field.",
            insteadOf: "Rebuilding Field chrome around those controls by hand.",
        },
    ],
} as const satisfies AgentGuidance;

export const badgeAgentGuidance = {
    goal: "Show a compact status or category on a row or header.",
    when: ["A row or entity status that must stay scannable.", "A short category next to a title."],
    avoid: ["A paragraph of feedback — use Message.", "A page-wide notice — use Banner.", "A button label — use Button."],
} as const satisfies AgentGuidance;
