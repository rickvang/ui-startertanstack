import type { Meta, StoryObj } from "@storybook/react-vite";
import { copyableDocs, libraryExportNote } from "../../../.storybook/copyable-snippets";
import { emptyStateSnippet } from "../../../.storybook/story-snippets";
import { Button } from "./button";
import { EmptyState } from "./empty-state";

const meta = {
    title: "Components/Empty state",
    component: EmptyState,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `${libraryExportNote} Import \`theme.css\` once in the app or Storybook preview. Put it inside the content container that is empty.`,
            },
        },
    },
    args: {
        title: "No members yet",
        children: "Invite someone to get started.",
        action: <Button>Invite</Button>,
    },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
    parameters: {
        docs: copyableDocs(emptyStateSnippet, libraryExportNote),
    },
};

export const WithoutAction: Story = {
    args: {
        action: undefined,
    },
};
