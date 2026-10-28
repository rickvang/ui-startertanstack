import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, menuSnippet } from "../../../.storybook/story-snippets";
import { Menu } from "./menu";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Menu",
    component: Menu,
    args: {
        defaultValue: "members",
        items: [
            { value: "members", label: "Members" },
            { value: "settings", label: "Settings" },
            { value: "billing", label: "Billing" },
        ],
    },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(menuSnippet),
};
