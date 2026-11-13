import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, textFieldSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { textFieldAgentGuidance } from "./inputs.agent";
import { TextField } from "./text-field";

const meta = {
    title: "Components/Text field",
    parameters: {
        layout: "fullscreen",
        agent: textFieldAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextFieldStory: Story = {
    name: "Text field",
    render: () => (
        <DocPage title="Text field" intro="Collect a single line of text. Pair label, hint, and error with the field.">
            <DocSection title="Example">
                <DocDemo className="flex max-w-md flex-col gap-spacing-05">
                    <TextField label="Project name" defaultValue="Studio" hint="Shown on the project home." />
                    <TextField label="Email" layout="horizontal" className="w-full" placeholder="alex@north.test" />
                    <TextField label="Slug" defaultValue="Studio!" error="Use lowercase letters and hyphens." />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["One short value: name, email, title, slug.", "The answer is typed, not chosen from a list."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Long prose. Use Text area.",
                        "A choice from options. Use Select, Radio, or Checkbox.",
                        "An immediate on/off setting. Use Switch.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={textFieldSnippet} />
        </DocPage>
    ),
};
