import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "./breadcrumb";

const meta = {
    title: "Components/Breadcrumb",
    component: Breadcrumb,
    args: {
        items: [
            { label: "Projects", href: "#projects" },
            { label: "Studio", href: "#studio" },
            { label: "Members" },
        ],
    },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
