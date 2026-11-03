import { create } from "storybook/theming";

/**
 * Editorial library chrome + flat product canvas.
 * Hex approximations of packages/ui theme tokens (warm neutrals + teal brand).
 * Selected-item soft rail is finished in manager-head.html (theme API forces solid fills).
 */
export const catalogTheme = create({
    base: "light",

    // Brand — wordmark only (no icon mark)
    brandTitle: "UI Starter",
    brandUrl: "./",
    brandTarget: "_self",

    // Catalog chrome type; story components keep theme.css --font-sans
    fontBase: '"Instrument Sans", "Segoe UI", ui-sans-serif, sans-serif',
    fontCode: '"IBM Plex Mono", ui-monospace, monospace',

    colorPrimary: "#0F766E",
    // Keep secondary teal for tabs/focus; sidebar selection overridden in manager-head
    colorSecondary: "#0F766E",

    // Paper sidebar, flat preview
    appBg: "#F7F3EB",
    appContentBg: "#FFFEFB",
    appPreviewBg: "#F3F1EC",
    appBorderColor: "#E5DED2",
    appBorderRadius: 10,

    textColor: "#2A2620",
    textMutedColor: "#6B655C",
    textInverseColor: "#FFFEFB",

    barTextColor: "#6B655C",
    barSelectedColor: "#0F766E",
    barHoverColor: "#0F766E",
    barBg: "#FFFEFB",

    inputBg: "#FFFEFB",
    inputBorder: "#E5DED2",
    inputTextColor: "#2A2620",
    inputBorderRadius: 8,

    buttonBg: "#FFFEFB",
    buttonBorder: "#E5DED2",

    booleanBg: "#F0EADF",
    booleanSelectedBg: "#0F766E",
});

export default catalogTheme;
