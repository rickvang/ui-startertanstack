import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayoutPurpose } from "./layout-purpose";
import { Masonry } from "./masonry";

const meta = {
    title: "Layout/Arrange/Split/Masonry",
    component: Masonry,
    args: {
        children: "Blocks",
    },
} satisfies Meta<typeof Masonry>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoColumns: Story = {
    render: () => (
        <div className="max-w-sm">
            <LayoutPurpose>Use Masonry when blocks are uneven and should pack into columns.</LayoutPurpose>
            <Masonry>
                <div className="mb-spacing-04 break-inside-avoid bg-surface p-spacing-04 text-sm">Short</div>
                <div className="mb-spacing-04 h-spacing-11 break-inside-avoid bg-surface p-spacing-04 text-sm">Taller</div>
                <div className="mb-spacing-04 h-spacing-09 break-inside-avoid bg-surface p-spacing-04 text-sm">Middle</div>
            </Masonry>
        </div>
    ),
};
