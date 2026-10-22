import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./text-field";

const meta = {
    title: "Components/Text field",
    component: TextField,
    args: {
        label: "Project name",
        placeholder: "ui-starter",
        hint: "Shown on the project home screen.",
    },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Stacked: Story = {
    name: "Stacked",
};

export const Horizontal: Story = {
    name: "Horizontal",
    args: { layout: "horizontal", className: "w-full max-w-md" },
};
