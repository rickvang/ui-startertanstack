import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, stackSnippet } from "../../../.storybook/story-snippets";
import { LayoutPurpose } from "./layout-purpose";
import { Stack } from "./stack";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Layout/Arrange/Flow/Stack",
    component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
    ...docsFromSnippet(stackSnippet),
    args: { children: "Blocks" },
    render: () => (
        <div>
            <LayoutPurpose>Use Stack when a parent places blocks vertically. The children do not add their own margin.</LayoutPurpose>
            <Stack gap="lg">
                <Stack gap="sm" className="rounded-md border border-line bg-surface p-spacing-04 text-sm text-ink">
                    <span>Small gap</span>
                    <span>These two lines stay together.</span>
                </Stack>
                <span className="text-sm text-muted">A larger gap separates that group from the next block.</span>
            </Stack>
        </div>
    ),
};
