import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, radioSnippet } from "../../../.storybook/story-snippets";
import { RadioGroup } from "./radio";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Radio",
    component: RadioGroup,
    args: {
        label: "Role",
        defaultValue: "editor",
        options: [
            { value: "owner", label: "Owner" },
            { value: "editor", label: "Editor" },
            { value: "viewer", label: "Viewer" },
        ],
    },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Stacked: Story = {
    ...docsFromSnippet(radioSnippet),
    name: "Stacked",
};

export const Horizontal: Story = {
    name: "Horizontal",
    args: { layout: "horizontal", className: "w-full max-w-md" },
};
