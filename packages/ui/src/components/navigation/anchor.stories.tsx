import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, anchorSnippet } from "../../../.storybook/story-snippets";
import { Anchor } from "./anchor";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Anchor",
    component: Anchor,
    args: {
        items: [
            { href: "#members", label: "Members" },
            { href: "#details", label: "Details" },
            { href: "#settings", label: "Settings" },
        ],
    },
} satisfies Meta<typeof Anchor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(anchorSnippet),
};
