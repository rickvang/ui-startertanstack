import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./tabs";

const meta = {
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

export const Default: Story = {};
