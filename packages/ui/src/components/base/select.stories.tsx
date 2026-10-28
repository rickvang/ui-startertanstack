import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, selectSnippet } from "../../../.storybook/story-snippets";
import { Select } from "./select";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
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
    ...docsFromSnippet(selectSnippet),
    name: "Stacked",
};

export const Horizontal: Story = {
    name: "Horizontal",
    args: { layout: "horizontal", className: "w-full max-w-md" },
};
