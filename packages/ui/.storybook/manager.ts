import { addons } from "storybook/manager-api";
import { catalogTheme } from "./theme";

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
});
