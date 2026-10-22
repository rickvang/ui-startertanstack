import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./switch";

const meta = {
    title: "Components/Switch",
    component: Switch,
    args: {
        label: "Active",
        defaultChecked: true,
    },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Stacked: Story = {
    name: "Stacked",
    args: { layout: "stacked" },
};

export const Horizontal: Story = {
    name: "Horizontal",
    args: { layout: "horizontal", className: "w-full max-w-md" },
};
