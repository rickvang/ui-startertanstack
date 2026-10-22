import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./checkbox";

const meta = {
    title: "Components/Checkbox",
    component: Checkbox,
    args: {
        label: "Email members",
    },
} satisfies Meta<typeof Checkbox>;

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
