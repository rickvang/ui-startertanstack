import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

export const overlaysOverviewAgentGuidance = {
    goal: "Pick one overlay job. Do not nest overlays. Message, Toast, and Banner are not overlays.",
    cases: [
        { name: "Dialog", when: "The page must wait. Confirm, or one or two fields.", use: "Dialog." },
        { name: "Drawer", when: "Keep the page. The task needs the full height.", use: "Drawer." },
        { name: "Slide-in", when: "Keep the page. A quick task that should not take the full height.", use: "Slide-in." },
        { name: "Bottom sheet", when: "The same job as Dialog or Drawer, on a small screen, from the foot.", use: "Bottom sheet." },
        { name: "Popover", when: "A small panel attached to a control. The page stays live.", use: "Popover." },
        { name: "Tooltip", when: "A short hint. No actions.", use: "Tooltip." },
        { name: "Message", when: "A result next to the work.", use: "Message. Not an overlay.", avoid: "Do not treat Message as an overlay." },
        { name: "Toast", when: "A brief notice after leaving the work.", use: "Toast. Not an overlay." },
        { name: "Banner", when: "A note about the whole page that should stay.", use: "Banner. Not an overlay." },
    ],
    avoid: [
        "Opening a dialog, drawer, slide-in, bottom sheet, or popover from another overlay — close the first one.",
        "A tooltip may sit on a control inside an overlay; that is the only nesting allowed.",
    ],
} as const satisfies AgentGuidance;

export const dialogAgentGuidance = {
    goal: "Stop the page for a confirm or a short form (one or two fields).",
    when: ["The page must wait.", "Confirm a destructive action, or rename with one or two fields."],
    avoid: [
        "A full-height task while keeping the page — use Drawer.",
        "A quick non-blocking task — use Slide-in or Popover.",
        "A small screen foot sheet for the same job — use Bottom sheet.",
        "A brief result after leaving the work — use Toast.",
    ],
} as const satisfies AgentGuidance;

export const drawerAgentGuidance = {
    goal: "Keep the page visible and run a full-height task beside it.",
    when: ["The task needs the full height.", "The person will compare the panel with the page for a while."],
    avoid: [
        "A yes or no — use Dialog.",
        "A quick task that should not take the full height — use Slide-in.",
        "A small panel on one control — use Popover.",
    ],
} as const satisfies AgentGuidance;

export const slideInAgentGuidance = {
    goal: "Keep the page and open a short edge panel that does not take the full height.",
    when: ["A quick task on the current page.", "The panel should not take the full height."],
    avoid: [
        "The task needs the full height, or the person will compare it with the list for a while — use Drawer.",
        "A yes or no — use Dialog.",
        "A small screen, from the foot — use Bottom sheet.",
        "A small panel attached to a control — use Popover.",
    ],
} as const satisfies AgentGuidance;

export const bottomSheetAgentGuidance = {
    goal: "On a small screen, run a Dialog- or Drawer-like job from the foot.",
    when: ["The same job as Dialog or Drawer, on a small screen, from the foot."],
    avoid: ["Desktop full-height tasks — use Drawer.", "A control-attached menu — use Popover or Dropdown."],
} as const satisfies AgentGuidance;

export const popoverAgentGuidance = {
    goal: "Attach a small live panel to one control without stopping the page.",
    when: ["A small task that belongs to one control.", "The person should still use the page behind it."],
    avoid: [
        "The page must wait — use Dialog, or Bottom sheet on a small screen.",
        "The task needs the full height — use Drawer.",
        "A short hint with no actions — use Tooltip.",
        "A list of actions only — use Dropdown.",
    ],
} as const satisfies AgentGuidance;

export const tooltipAgentGuidance = {
    goal: "Show a short non-interactive hint on hover or focus.",
    when: ["A short hint that is not required to finish the task.", "Hover or focus is enough. There is nothing to click inside it."],
    avoid: [
        "A control, a field, or a link inside the hint — use Popover.",
        "A result of an action — use Message, or Toast after leaving the work.",
        "A yes or no — use Dialog.",
    ],
} as const satisfies AgentGuidance;
