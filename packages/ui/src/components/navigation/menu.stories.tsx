import type { Meta, StoryObj } from "@storybook/react-vite";
import { Menu } from "./menu";

const meta = {
    title: "Components/Menu",
    component: Menu,
    args: {
        defaultValue: "members",
        items: [
            { value: "members", label: "Members" },
            { value: "settings", label: "Settings" },
            { value: "billing", label: "Billing" },
        ],
    },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
