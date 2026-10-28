import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, inlineEditSnippet } from "../../../.storybook/story-snippets";
import { DescriptionList } from "../base/description-list";
import { TextField } from "../base/text-field";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";

const meta = {
    title: "Patterns/Inline edit",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const InlineEdit: Story = {
    name: "Inline edit",
    render: () => (
        <DocPage title="Inline edit" intro="One fact becomes a field where it sits.">
            <DocSection title="Example">
                <DocParagraph>The field replaces that fact. The rest of the detail stays. There is no page Save.</DocParagraph>
                <DocDemo className="max-w-xl">
                    <div className="flex flex-col gap-spacing-05">
                        <DescriptionList items={[{ label: "Role", value: "Owner" }]} layout="horizontal" align="start" />
                        <TextField label="Role" layout="horizontal" defaultValue="Owner" />
                    </div>
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
