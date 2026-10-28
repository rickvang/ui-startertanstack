import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, textAreaSnippet } from "../../../.storybook/story-snippets";
import { TextArea } from "./text-area";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
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
    ...docsFromSnippet(textAreaSnippet),
    name: "Stacked",
};

export const Horizontal: Story = {
    name: "Horizontal",
    args: { layout: "horizontal", hint: "Street, district, and city.", className: "w-full max-w-md" },
};
