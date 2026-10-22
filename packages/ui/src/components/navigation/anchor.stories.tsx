import type { Meta, StoryObj } from "@storybook/react-vite";
import { Anchor } from "./anchor";

const meta = {
    title: "Components/Anchor",
    component: Anchor,
    args: {
        items: [
            { href: "#members", label: "Members" },
            { href: "#details", label: "Details" },
            { href: "#settings", label: "Settings" },
        ],
    },
} satisfies Meta<typeof Anchor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
