import type { Meta, StoryObj } from "@storybook/react-vite";
import { Steps } from "./steps";

const meta = {
    title: "Components/Steps",
    component: Steps,
    args: {
        current: 1,
        items: ["Details", "Review", "Invite"],
    },
} satisfies Meta<typeof Steps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
