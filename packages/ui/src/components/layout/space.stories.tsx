import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayoutPurpose } from "./layout-purpose";
import { Space } from "./space";

const meta = {
    title: "Layout/Arrange/Flow/Space",
    component: Space,
    args: {
        gap: "sm",
        children: "Items",
    },
} satisfies Meta<typeof Space>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inline: Story = {
    render: () => (
        <div className="max-w-xs">
            <LayoutPurpose>Use Space when inline items should wrap onto the next line, such as a row of actions.</LayoutPurpose>
            <Space>
                <span className="text-sm">Save</span>
                <span className="text-sm">Cancel</span>
                <span className="text-sm">Theme</span>
            </Space>
        </div>
    ),
};
