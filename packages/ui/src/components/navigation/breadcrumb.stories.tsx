import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, breadcrumbSnippet } from "../../../.storybook/story-snippets";
import { Breadcrumb } from "./breadcrumb";

import { breadcrumbAgentGuidance } from "./navigation.agent";
const meta = {
    tags: ["autodocs"],
    parameters: {
        ...autodocsComponentParameters,
        agent: breadcrumbAgentGuidance,
    },
    title: "Components/Breadcrumb",
    component: Breadcrumb,
    args: {
        items: [
            { label: "Projects", href: "#projects" },
            { label: "Studio", href: "#studio" },
            { label: "Members" },
        ],
    },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(breadcrumbSnippet),
};
