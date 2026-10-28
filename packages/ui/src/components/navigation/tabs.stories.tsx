import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, tabsSnippet } from "../../../.storybook/story-snippets";
import { Tabs } from "./tabs";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Tabs",
    component: Tabs,
    args: {
        defaultValue: "members",
        items: [
            { value: "members", label: "Members", content: "Alex Kim, Jordan Lee, Sam Patel" },
            { value: "settings", label: "Settings", content: "Project name and access." },
        ],
    },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(tabsSnippet),
};
