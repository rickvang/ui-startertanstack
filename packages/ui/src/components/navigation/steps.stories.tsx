import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, stepsSnippet } from "../../../.storybook/story-snippets";
import { Steps } from "./steps";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Steps",
    component: Steps,
    args: {
        current: 1,
        items: ["Details", "Review", "Invite"],
    },
} satisfies Meta<typeof Steps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(stepsSnippet),
};
