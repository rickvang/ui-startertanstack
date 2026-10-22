import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "./flex";
import { LayoutPurpose } from "./layout-purpose";

const meta = {
    title: "Layout/Arrange/Flow/Flex",
    component: Flex,
    args: {
        direction: "row",
        gap: "md",
        children: "Items",
    },
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Row: Story = {
    render: () => (
        <div>
            <LayoutPurpose>Use Flex when items stay on one line. A row is a toolbar. A column is a short list that should not wrap.</LayoutPurpose>
            <Flex>
                <span className="text-sm">One</span>
                <span className="text-sm">Two</span>
                <span className="text-sm">Three</span>
            </Flex>
        </div>
    ),
};
