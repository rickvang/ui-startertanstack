import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

const tokenGoal = (surface: string) =>
    `Use catalog ${surface} tokens. Prefer semantic tokens in product UI; primitives are the ramp underneath.`;

export const colorAgentGuidance = {
    goal: tokenGoal("color"),
    when: ["Need fill, text, border, or status color from the system."],
    avoid: ["Hard-coded hex in product UI.", "Inventing a new status color outside the catalog."],
} as const satisfies AgentGuidance;

export const typeAgentGuidance = {
    goal: tokenGoal("type"),
    when: ["Need a text role: display, title, body, label, or mono."],
    avoid: ["One-off font sizes outside the type scale.", "Using display type for dense app chrome."],
} as const satisfies AgentGuidance;

export const spacingAgentGuidance = {
    goal: tokenGoal("spacing"),
    when: ["Need padding, gap, or margin between elements."],
    avoid: ["Arbitrary pixel spacing in product layouts."],
} as const satisfies AgentGuidance;

export const sizingAgentGuidance = {
    goal: tokenGoal("sizing"),
    when: ["Need control height, icon box, or fixed width from the scale."],
    avoid: ["Ad-hoc widths that fight the sizing scale."],
} as const satisfies AgentGuidance;

export const radiusAgentGuidance = {
    goal: tokenGoal("radius"),
    when: ["Need corner radius on a surface or control."],
    avoid: ["Mixing many radii in one region without a reason."],
} as const satisfies AgentGuidance;

export const shadowAgentGuidance = {
    goal: tokenGoal("shadow"),
    when: ["Need elevation for an overlay or raised surface."],
    avoid: ["Stacking shadows for decoration on flat content."],
} as const satisfies AgentGuidance;

export const motionAgentGuidance = {
    goal: tokenGoal("motion"),
    when: ["Need enter, leave, or feedback motion from the catalog recipes."],
    avoid: ["Custom springs that fight reduced-motion and catalog recipes."],
} as const satisfies AgentGuidance;

export const motionRecipesAgentGuidance = {
    goal: "Apply a named motion recipe (reveal, fade, leave, feedback) instead of inventing timing.",
    when: ["An overlay, toast, or expandable needs enter/leave motion."],
    avoid: ["Per-component bespoke easing when a recipe already fits."],
} as const satisfies AgentGuidance;
