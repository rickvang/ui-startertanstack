import { addons } from "storybook/manager-api";
import { registerAgentPanel } from "./addons/agent/register";
import { catalogTheme } from "./theme";

registerAgentPanel();

const params = new URLSearchParams(window.location.search);
const embedded =
    params.has("embed") ||
    params.get("nav") === "false" ||
    (typeof window !== "undefined" && window.self !== window.top);

addons.setConfig({
    theme: catalogTheme,
    sidebar: {
        showRoots: true,
        collapsedRoots: [],
    },
    // Portfolio /library iframe and ?embed=1: hide nav chrome so the catalog is the page.
    ...(embedded
        ? {
              navSize: 0,
              bottomPanelHeight: 0,
              rightPanelWidth: 0,
          }
        : {}),
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
    enableShortcuts: !embedded,
});
