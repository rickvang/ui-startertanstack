import { addons, type State } from "storybook/manager-api";
import { registerAgentPanel } from "./addons/agent/register";
import { catalogTheme } from "./theme";

registerAgentPanel();

const params = new URLSearchParams(window.location.search);
// Opt-in only. Do not treat plain iframe hosts (Portfolio /library) as embed —
// that hid the catalog sidebar. Use ?embed=1 or ?nav=false for content-only.
const embedded = params.has("embed") || params.get("nav") === "false";

if (embedded) {
    document.documentElement.classList.add("catalog-embed");
}

function showPanelForStory(state: State, defaultValue: boolean) {
    // Getting started pages are reading/landing faces — hide Controls/Agent by default.
    // Other stories keep the user's panel preference (`defaultValue`).
    const tags = state.index?.[state.storyId]?.tags ?? [];
    if (tags.includes("hide-addon-panel")) {
        return false;
    }
    return defaultValue;
}

addons.setConfig({
    theme: catalogTheme,
    sidebar: {
        showRoots: true,
        collapsedRoots: [],
    },
    // Nested layout/ui — Storybook 10 deprecates top-level navSize / panelPosition.
    // ?embed=1 / ?nav=false: content only, no Storybook chrome.
    layout: embedded
        ? {
              showNav: false,
              showPanel: false,
              showToolbar: false,
              navSize: 0,
              bottomPanelHeight: 0,
              rightPanelWidth: 0,
              panelPosition: "bottom",
          }
        : {
              panelPosition: "bottom",
          },
    ui: {
        enableShortcuts: !embedded,
    },
    layoutCustomisations: embedded
        ? {
              showSidebar: () => false,
              showToolbar: () => false,
              showPanel: () => false,
          }
        : {
              showPanel: showPanelForStory,
          },
    toolbar: {
        // Keep Canvas/Docs tabs, theme, backgrounds, viewport, reload when not embedded.
        // Hide Storybook authoring / wireframe tools — catalog face, not SB demo.
        title: { hidden: false },
        zoom: { hidden: true },
        eject: { hidden: true },
        copy: { hidden: true },
        fullscreen: { hidden: true },
        measure: { hidden: true },
        outline: { hidden: true },
        grid: { hidden: true },
        "storybook/background.apply": { hidden: false },
        "storybook/viewport": { hidden: false },
    },
});
