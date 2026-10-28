import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, dividerSnippet } from "../../../.storybook/story-snippets";
import { Divider } from "./divider";
import { LayoutPurpose } from "./layout-purpose";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Layout/Arrange/Divider",
    component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(dividerSnippet),
    render: () => (
        <div className="max-w-sm">
            <LayoutPurpose>Use a Divider to draw a line between items. The parent still owns the gap.</LayoutPurpose>
            <div className="flex flex-col gap-spacing-04 text-sm">
                <span>Members</span>
                <Divider />
                <span>Settings</span>
            </div>
        </div>
    ),
};
