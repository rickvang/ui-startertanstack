import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./text-area";

const meta = {
    title: "Components/Text area",
    component: TextArea,
    args: {
        label: "Remark",
        defaultValue: "No. 18, Wantang Road, Xihu District, Hangzhou",
    },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Stacked: Story = {
    name: "Stacked",
};

export const Horizontal: Story = {
    name: "Horizontal",
    args: { layout: "horizontal", hint: "Street, district, and city.", className: "w-full max-w-md" },
};
