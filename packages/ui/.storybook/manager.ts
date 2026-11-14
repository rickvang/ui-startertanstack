import { addons, type State } from "storybook/manager-api";
import { registerAgentPanel } from "./addons/agent/register";
import { catalogTheme } from "./theme";

registerAgentPanel();

addons.setConfig({
    theme: catalogTheme,
    sidebar: {
        showRoots: true,
        collapsedRoots: [],
    },
    toolbar: {
        // Keep Canvas/Docs tabs, theme, backgrounds, viewport, reload.
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
    panelPosition: "bottom",
    enableShortcuts: true,
    layoutCustomisations: {
        // Getting started pages are reading/landing faces — hide Controls/Agent by default.
        // Other stories keep the user's panel preference (`defaultValue`).
        showPanel(state: State, defaultValue: boolean) {
            const tags = state.index?.[state.storyId]?.tags ?? [];
            if (tags.includes("hide-addon-panel")) {
                return false;
            }
            return defaultValue;
        },
    },
});
