import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.tsx"],
    addons: ["@storybook/addon-docs"],
    framework: "@storybook/react-vite",
    features: {
        // Stock Storybook onboarding — not part of the design-system catalog face
        sidebarOnboardingChecklist: false,
        menuOnboardingChecklist: false,
    },
    core: {
        disableWhatsNewNotifications: true,
    },
    async viteFinal(config) {
        config.plugins = [...(config.plugins ?? []), tailwindcss()];
        return config;
    },
};

export default config;
