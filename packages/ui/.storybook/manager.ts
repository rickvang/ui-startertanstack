import { addons } from "storybook/manager-api";
import { catalogTheme } from "./theme";

addons.setConfig({
    theme: catalogTheme,
    sidebar: {
        showRoots: true,
        collapsedRoots: [],
    },
    toolbar: {
        title: { hidden: false },
        zoom: { hidden: false },
        eject: { hidden: false },
        copy: { hidden: false },
        fullscreen: { hidden: false },
    },
    panelPosition: "bottom",
    enableShortcuts: true,
});
