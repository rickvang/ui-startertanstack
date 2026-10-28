import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, badgeSnippet } from "../../../.storybook/story-snippets";
import { Badge } from "./badge";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Badge",
    component: Badge,
    args: {
        children: "Active",
        variant: "success",
    },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
    ...docsFromSnippet(badgeSnippet),
};

export const Warning: Story = {
    args: { children: "Review", variant: "warning" },
};

export const Danger: Story = {
    args: { children: "Blocked", variant: "danger" },
};

export const Neutral: Story = {
    args: { children: "Draft", variant: "neutral" },
};

export const Variants: Story = {
    render: () => (
        <div className="flex items-center gap-spacing-04">
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Review</Badge>
            <Badge variant="danger">Blocked</Badge>
            <Badge variant="neutral">Draft</Badge>
        </div>
    ),
};
