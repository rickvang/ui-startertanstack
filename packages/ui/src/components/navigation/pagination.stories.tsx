import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./pagination";

const meta = {
    title: "Components/Pagination",
    component: Pagination,
    args: {
        total: 3,
        defaultPage: 1,
    },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
