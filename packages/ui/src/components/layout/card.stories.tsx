import type { Meta, StoryObj } from "@storybook/react-vite";
import { copyableDocs, libraryExportNote } from "../../../.storybook/copyable-snippets";
import { cardSnippet } from "../../../.storybook/story-snippets";
import { Card } from "./card";

const meta = {
    title: "Components/Card",
    component: Card,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `${libraryExportNote} Import \`theme.css\` once in the app or Storybook preview.`,
            },
        },
    },
    args: {
        children: "North team",
        variant: "outlined",
    },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
    parameters: {
        docs: copyableDocs(cardSnippet, libraryExportNote),
    },
};

export const Raised: Story = {
    args: { variant: "raised" },
};

export const Quiet: Story = {
    args: { variant: "quiet" },
};

export const Variants: Story = {
    render: () => (
        <div className="flex items-center gap-spacing-04">
            <Card variant="outlined">Outlined</Card>
            <Card variant="raised">Raised</Card>
            <Card variant="quiet">Quiet</Card>
        </div>
    ),
};
