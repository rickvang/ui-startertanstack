import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, fieldSnippet } from "../../../.storybook/story-snippets";
import { Field } from "./field";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Field",
    component: Field,
    args: {
        label: "Project name",
        hint: "Shown on the project home.",
        children: null,
    },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

function Control({ id }: { id: string }) {
    return <input id={id} defaultValue="Studio" className="h-spacing-07 w-full rounded-md border border-line bg-surface px-spacing-03 text-sm text-ink" />;
}

export const Hint: Story = {
    ...docsFromSnippet(fieldSnippet),
    name: "Hint",
    render: () => (
        <Field label="Project name" hint="Shown on the project home." htmlFor="project-name">
            <Control id="project-name" />
        </Field>
    ),
};

export const Error: Story = {
    name: "Error",
    render: () => (
        <Field label="Project name" hint="Shown on the project home." error="Enter a project name." required htmlFor="project-name-error">
            <Control id="project-name-error" />
        </Field>
    ),
};
