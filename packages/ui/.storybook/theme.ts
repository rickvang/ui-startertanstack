import { create } from "storybook/theming";

/**
 * Storybook chrome aligned to packages/ui design tokens (warm neutrals + teal brand).
 * Hex approximations of the oklch ramps in src/styles/theme.css.
 */
const brandMark =
    "data:image/svg+xml," +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#0F766E"/>
            <path d="M9 21.5V10.5h3.1c2.55 0 4.15 1.35 4.15 3.55 0 1.35-.7 2.4-1.85 2.95L18.7 21.5h-3.25l-3.1-3.85H12.1V21.5H9Zm3.1-6.55h.15c1.05 0 1.7-.55 1.7-1.45s-.65-1.45-1.7-1.45H12.1v2.9Z" fill="#FAF9F6"/>
            <circle cx="22.5" cy="11" r="2.25" fill="#99F6E4"/>
        </svg>`,
    );

export const catalogTheme = create({
    base: "light",

    // Brand
    brandTitle: "UI Starter · Design system",
    brandUrl: "./",
    brandImage: brandMark,
    brandTarget: "_self",

    // Typography — catalog chrome (preview stories still use theme.css)
    fontBase: '"Sora", "Segoe UI", ui-sans-serif, sans-serif',
    fontCode: '"IBM Plex Mono", ui-monospace, monospace',

    // Colors from brand / neutral ramps
    colorPrimary: "#0F766E",
    colorSecondary: "#0F766E",

    // App shell
    appBg: "#F3F1EC",
    appContentBg: "#FAF9F6",
    appPreviewBg: "#F3F1EC",
    appBorderColor: "#DDD8CF",
    appBorderRadius: 10,

    // Text
    textColor: "#2A2620",
    textMutedColor: "#6B655C",
    textInverseColor: "#FAF9F6",

    // Toolbar
    barTextColor: "#6B655C",
    barSelectedColor: "#0F766E",
    barHoverColor: "#0F766E",
    barBg: "#FAF9F6",

    // Form / inputs in manager
    inputBg: "#FAF9F6",
    inputBorder: "#DDD8CF",
    inputTextColor: "#2A2620",
    inputBorderRadius: 8,

    // Buttons
    buttonBg: "#FAF9F6",
    buttonBorder: "#DDD8CF",

    // Boolean / controls
    booleanBg: "#EAE6DF",
    booleanSelectedBg: "#0F766E",
});

export default catalogTheme;
