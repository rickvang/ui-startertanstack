import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, paginationSnippet } from "../../../.storybook/story-snippets";
import { Pagination } from "./pagination";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Pagination",
    component: Pagination,
    args: {
        total: 3,
        defaultPage: 1,
    },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(paginationSnippet),
};
