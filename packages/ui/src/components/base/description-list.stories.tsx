import type { Meta, StoryObj } from "@storybook/react-vite";
import { DescriptionList } from "./description-list";

const meta = {
    title: "Components/Description list",
    component: DescriptionList,
    args: {
        items: [
            { label: "Role", value: "Owner" },
            { label: "Lives in", value: "Hangzhou" },
        ],
    },
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Stacked: Story = {
    name: "Stacked",
};

export const Horizontal: Story = {
    name: "Horizontal",
    args: { layout: "horizontal", align: "end", className: "w-full max-w-xl" },
};

export const Left: Story = {
    name: "Left",
    args: { layout: "horizontal", align: "start", className: "w-full max-w-xl" },
};
