import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, dropdownSnippet } from "../../../.storybook/story-snippets";
import { Dropdown } from "./dropdown";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Dropdown",
    component: Dropdown,
    args: {
        label: "Actions",
        items: ["Edit", "Duplicate", "Delete"],
    },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(dropdownSnippet),
};
