import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, switchSnippet } from "../../../.storybook/story-snippets";
import { Switch } from "./switch";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Switch",
    component: Switch,
    args: {
        label: "Active",
        defaultChecked: true,
    },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(switchSnippet),
};

export const Stacked: Story = {
    name: "Stacked",
    args: { layout: "stacked" },
};

export const Horizontal: Story = {
    name: "Horizontal",
    args: { layout: "horizontal", className: "w-full max-w-md" },
};
