import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./dropdown";

const meta = {
    title: "Components/Dropdown",
    component: Dropdown,
    args: {
        label: "Actions",
        items: ["Edit", "Duplicate", "Delete"],
    },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
