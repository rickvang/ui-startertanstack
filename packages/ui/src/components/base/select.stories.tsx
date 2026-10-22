import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";

const meta = {
    title: "Components/Select",
    component: Select,
    args: {
        label: "Role",
        defaultValue: "editor",
        options: [
            { value: "owner", label: "Owner" },
            { value: "editor", label: "Editor" },
            { value: "viewer", label: "Viewer" },
        ],
    },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Stacked: Story = {
    name: "Stacked",
};

export const Horizontal: Story = {
    name: "Horizontal",
    args: { layout: "horizontal", className: "w-full max-w-md" },
};
