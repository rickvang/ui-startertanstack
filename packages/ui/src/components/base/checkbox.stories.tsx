import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, checkboxSnippet } from "../../../.storybook/story-snippets";
import { Checkbox } from "./checkbox";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Checkbox",
    component: Checkbox,
    args: {
        label: "Email members",
    },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(checkboxSnippet),
};

export const Stacked: Story = {
    name: "Stacked",
    args: { layout: "stacked" },
};

export const Horizontal: Story = {
    name: "Horizontal",
    args: { layout: "horizontal", className: "w-full max-w-md" },
};
