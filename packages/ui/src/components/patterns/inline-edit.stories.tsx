import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, inlineEditSnippet } from "../../../.storybook/story-snippets";
import { DescriptionList } from "../base/description-list";
import { TextField } from "../base/text-field";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { PatternDemoFrame } from "./pattern-demo-frame";
import { inlineEditAgentGuidance } from "./patterns.agent";
const meta = {
    title: "Patterns/Inline edit",
    parameters: {
        layout: "fullscreen",
        agent: inlineEditAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const InlineEdit: Story = {
    name: "Inline edit",
    render: () => (
        <DocPage title="Inline edit" intro="One fact becomes a field where it sits.">
            <DocSection title="Example">
                <DocParagraph>The field replaces that fact. The rest of the detail stays. There is no page Save.</DocParagraph>
                <DocDemo bleed>
                    <PatternDemoFrame title="Members" domain="members" helpTitle="Inline edit" helpBody="One fact becomes a field where it sits. There is no page Save.">
                        <div className="flex max-w-xl flex-col gap-spacing-05">
                            <DescriptionList items={[{ label: "Role", value: "Owner" }]} layout="horizontal" align="start" />
                            <TextField label="Role" layout="horizontal" defaultValue="Owner" />
                        </div>
                    </PatternDemoFrame>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets
                    items={[
                        "The person is changing a single value, not the whole record.",
                        "The change commits from the field.",
                    ]}
                />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Several facts need to change together. Use modifying a record. Save and Cancel belong to that form.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={compositionNote} code={inlineEditSnippet} />
        </DocPage>
    ),
};
