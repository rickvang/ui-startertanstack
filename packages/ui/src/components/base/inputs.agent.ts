import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

export const textFieldAgentGuidance = {
    goal: "Collect a single line of text. Pair with Field for label, help, and error.",
    when: ["One short value: name, email, title."],
    avoid: ["Long prose — use Text area.", "A choice from options — use Select, Radio, or Checkbox."],
} as const satisfies AgentGuidance;

export const textAreaAgentGuidance = {
    goal: "Collect multi-line text. Pair with Field for label, help, and error.",
    when: ["Notes, descriptions, or other multi-line copy."],
    avoid: ["A single short value — use Text field."],
} as const satisfies AgentGuidance;

export const selectAgentGuidance = {
    goal: "Choose one option from a known list.",
    when: ["A closed set of options that does not need to stay fully visible."],
    avoid: ["Few options that should stay visible — use Radio.", "Multiple independent toggles — use Checkbox."],
} as const satisfies AgentGuidance;

export const checkboxAgentGuidance = {
    goal: "Toggle one independent yes/no, or select several options.",
    when: ["An independent on/off fact.", "Several options may be true at once."],
    avoid: ["Exactly one of a small set — use Radio.", "A settings switch with immediate effect — consider Switch."],
} as const satisfies AgentGuidance;

export const radioAgentGuidance = {
    goal: "Choose exactly one option from a small visible set.",
    when: ["Few options that should stay on screen.", "Exactly one must be selected."],
    avoid: ["A long list of options — use Select.", "Independent toggles — use Checkbox."],
} as const satisfies AgentGuidance;

export const switchAgentGuidance = {
    goal: "Toggle an immediate setting on or off.",
    when: ["A setting that takes effect now."],
    avoid: ["A form fact submitted later — use Checkbox.", "Choosing among more than two values — use Radio or Select."],
} as const satisfies AgentGuidance;

export const loaderAgentGuidance = {
    goal: "Show that content is still loading without implying emptiness.",
    when: ["Waiting on a response for a region or table rows."],
    avoid: ["No items after a successful load — use Empty state.", "A finished error — use Message or Table error."],
} as const satisfies AgentGuidance;

export const avatarAgentGuidance = {
    goal: "Represent a person or entity with initials or an image.",
    when: ["Identity needs a compact face in lists, headers, or account chrome."],
    avoid: ["Using Avatar as a status badge — use Badge."],
} as const satisfies AgentGuidance;

export const descriptionListAgentGuidance = {
    goal: "Show labeled facts for one record as term/description pairs.",
    when: ["Read-only key facts for one object."],
    avoid: ["Editable fields — use a form.", "Many records — use a table."],
} as const satisfies AgentGuidance;

export const fieldsetAgentGuidance = {
    goal: "Group related fields under one legend inside a form.",
    when: ["Several fields share one meaning and should be named together."],
    avoid: ["A single field — use Field alone.", "Page sections that are not a form — use detail groups or tabs."],
} as const satisfies AgentGuidance;

export const formAgentGuidance = {
    goal: "Own submit lifecycle for a set of fields.",
    when: ["Creating or changing a record with an explicit submit."],
    avoid: ["Read-only display — use Detail.", "One in-place fact — use Inline edit."],
} as const satisfies AgentGuidance;

export const detailGroupAgentGuidance = {
    goal: "Split a read-only record into named groups of facts.",
    when: ["One record, several weakly separated fact groups."],
    avoid: ["Editing those facts — use a form.", "Ordered process stages — use Steps."],
} as const satisfies AgentGuidance;

export const cardAgentGuidance = {
    goal: "Present a self-contained scannable unit among peers.",
    when: ["The block should read as one unit in a set of peers."],
    avoid: ["A full page region — use Panel.", "Decorating every stack with a card when space alone is enough."],
} as const satisfies AgentGuidance;

export const gettingStartedAgentGuidance = {
    goal: "Orient a human or agent to how this catalog is organized before building screens.",
    when: ["Starting work in the catalog or choosing where a screen belongs."],
    avoid: ["Skipping Patterns/Overview when the job is a workflow.", "Building product chrome outside Shell."],
    decisions: [
        {
            title: "Where does a new screen start?",
            choose: "Try it as a catalog story first; hold workspaces/clients/projects in the app only when asked.",
            insteadOf: "Jumping straight into a one-off page without a pattern.",
        },
    ],
} as const satisfies AgentGuidance;
