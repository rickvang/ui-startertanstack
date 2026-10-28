import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, splitterSnippet } from "../../../.storybook/story-snippets";
import { LayoutPurpose } from "./layout-purpose";
import { Splitter } from "./splitter";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Layout/Arrange/Split/Splitter",
    component: Splitter,
    args: {
        start: "List",
        end: "Details",
    },
} satisfies Meta<typeof Splitter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoPanes: Story = {
    ...docsFromSnippet(splitterSnippet),
    render: (args) => (
        <div className="max-w-xl">
            <LayoutPurpose>Use Splitter when a region is two panes, such as a list beside its details.</LayoutPurpose>
            <Splitter {...args} />
        </div>
    ),
};
