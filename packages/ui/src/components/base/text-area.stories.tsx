import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, textAreaSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { textAreaAgentGuidance } from "./inputs.agent";
import { TextArea } from "./text-area";

const meta = {
    title: "Components/Text area",
    parameters: {
        layout: "fullscreen",
        agent: textAreaAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextAreaStory: Story = {
    name: "Text area",
    render: () => (
        <DocPage title="Text area" intro="Collect multi-line text. Pair label, hint, and error with the field.">
            <DocSection title="Example">
                <DocDemo className="max-w-md">
                    <TextArea
                        label="Description"
                        defaultValue="The design system for North."
                        hint="Shown under the project name."
                        rows={4}
                    />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Notes, descriptions, or other multi-line copy.", "The person may write more than one sentence."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["A single short value. Use Text field.", "A choice from options. Use Select or Radio."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={textAreaSnippet} />
        </DocPage>
    ),
};
