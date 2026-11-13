import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, checkboxSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Checkbox } from "./checkbox";
import { checkboxAgentGuidance } from "./inputs.agent";

const meta = {
    title: "Components/Checkbox",
    parameters: {
        layout: "fullscreen",
        agent: checkboxAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxStory: Story = {
    name: "Checkbox",
    render: () => (
        <DocPage title="Checkbox" intro="Toggle one independent fact, or select several options that can be true at once.">
            <DocSection title="Example">
                <DocDemo className="flex max-w-md flex-col gap-spacing-04">
                    <Checkbox label="Email me when someone comments" defaultChecked />
                    <Checkbox label="Include me on weekly summaries" />
                    <Checkbox label="Required acceptance" error="Accept before continuing." />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["An independent on/off fact.", "Several options may be true at once."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Exactly one of a small set. Use Radio.",
                        "A settings switch with immediate effect. Use Switch.",
                        "A closed list that should collapse. Use Select.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={checkboxSnippet} />
        </DocPage>
    ),
};
