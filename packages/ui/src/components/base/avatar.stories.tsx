import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, avatarSnippet } from "../../../.storybook/story-snippets";
import { Avatar } from "./avatar";
import { avatarAgentGuidance } from "./inputs.agent";

const meta = {
    tags: ["autodocs"],
    parameters: {
        ...autodocsComponentParameters,
        agent: avatarAgentGuidance,
    },
    title: "Components/Avatar",
    component: Avatar,
    args: {
        name: "Alex Kim",
    },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(avatarSnippet),
};
