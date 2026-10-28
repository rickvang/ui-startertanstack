import type { Preview } from "@storybook/react-vite";
import "../src/styles/storybook.css";

const preview: Preview = {
    initialGlobals: {
        theme: "light",
    },
    globalTypes: {
        theme: {
            description: "Color theme",
            toolbar: {
                title: "Theme",
                icon: "circlehollow",
                items: [
                    { value: "light", icon: "sun", title: "Light" },
                    { value: "dark", icon: "moon", title: "Dark" },
                ],
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (Story, context) => {
            const isDark = context.globals.theme === "dark";
            document.documentElement.classList.toggle("dark", isDark);
            document.documentElement.classList.toggle("light", !isDark);
            return Story();
        },
    ],
    parameters: {
        layout: "centered",
        docs: {
            source: {
                state: "open",
            },
        },
        options: {
            storySort: {
                includeNames: true,
                order: [
                    "Getting started",
                    ["This catalog", "This starter"],
                    "Foundations",
                    ["Color", "Type", "Spacing", "Sizing", "Radius", "Shadow", "Motion", ["Primitives", "Semantic", "Examples", "Recipes", "Drawer reveal", "Tab change", "Card expansion", "Loading to content"]],
                    "Layout",
                    [
                        "Frames",
                        "Overlays",
                        ["Modal", "Drawer", "Drawer, when", "Slide-in", "Dialog"],
                        "Rules",
                        ["Message and feedback", "Empty status"],
                        "Arrange",
                        ["Flow", ["Flex", "Space", "Stack"], "Split", ["Grid", "Splitter", "Masonry"], "Divider"],
                    ],
                    "Components",
                    ["Button", "Text field", "Text area", "Select", "Checkbox", "Radio", "Switch", "Field", "Description list", "Badge", "Loader", "Message", "Avatar", "Anchor", "Breadcrumb", "Dropdown", "Menu", "Pagination", "Steps", "Tabs"],
                    "Modules",
                    [
                        "Shell",
                        "Settings",
                        "Account",
                        "Forms",
                        ["Forms", "Fieldset", "Fieldset, densities", "Fieldset, error", "Form, ready", "Form, summary", "Form, pending"],
                        "Detail",
                        ["Detail", "Detail group"],
                        "Table",
                        ["Overview", "Members", "Find", "Select and act", "Expand", "States", "Wide and sticky", "Long list"],
                    ],
                    "Patterns",
                    ["Overview", "Navigating domains", "Switching organizations", "Product settings", "Account information", "Create a record", "Modifying a record", "Inline edit", "Wizard", "Onboarding", "Task management", "Visualization page"],
                ],
            },
        },
        viewport: {
            options: {
                mobile: {
                    name: "Mobile",
                    styles: { width: "375px", height: "812px" },
                },
                desktop: {
                    name: "Desktop",
                    styles: { width: "1440px", height: "900px" },
                },
            },
        },
    },
};

export default preview;
