import type { Meta, StoryObj } from "@storybook/react-vite";
import { fieldSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { fieldAgentGuidance } from "./controls.agent";
import { Field } from "./field";

const meta = {
    title: "Components/Field",
    parameters: {
        layout: "fullscreen",
        agent: fieldAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function Control({ id }: { id: string }) {
    return (
        <input
            id={id}
            defaultValue="Studio"
            className="h-spacing-07 w-full rounded-md border border-line bg-surface px-spacing-03 text-sm text-ink"
        />
    );
}

export const FieldStory: Story = {
    name: "Field",
    render: () => (
        <DocPage title="Field" intro="Own the label, hint, and error around any control. Prefer Text field and Select when they already wrap Field.">
            <DocSection title="Example">
                <DocDemo className="flex max-w-md flex-col gap-spacing-05">
                    <Field label="Project name" hint="Shown on the project home." htmlFor="project-name">
                        <Control id="project-name" />
                    </Field>
                    <Field
                        label="Project name"
                        hint="Shown on the project home."
                        error="Enter a project name."
                        required
                        htmlFor="project-name-error"
                    >
                        <Control id="project-name-error" />
                    </Field>
                    <Field label="Owner" layout="horizontal" htmlFor="project-owner" className="w-full">
                        <Control id="project-owner" />
                    </Field>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets
                    items={[
                        "A custom control needs the same label, hint, and error chrome as Text field.",
                        "You are composing layout around a control the catalog does not wrap yet.",
                    ]}
                />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A single-line text value. Use Text field.",
                        "A known list of options. Use Select or Radio.",
                        "A page-level note. Use Message or Banner.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={fieldSnippet} />
        </DocPage>
    ),
};
