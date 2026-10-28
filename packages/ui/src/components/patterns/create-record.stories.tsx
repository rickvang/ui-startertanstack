import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, createRecordSnippet } from "../../../.storybook/copyable-snippets";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { TextField } from "../base/text-field";
import { FormGroup } from "../modules/form-group";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";

const meta = {
    title: "Patterns/Create a record",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CreateRecord: Story = {
    name: "Create a record",
    render: () => {
        const [saved, setSaved] = useState(false);

        return (
            <DocPage title="Create a record" intro="Fill one form, then report the result.">
                <DocSection title="Example">
                    <DocParagraph>Save closes the task. After save, say what happened and offer one next step.</DocParagraph>
                    <DocDemo className="max-w-xl">
                        {saved ? (
                            <div className="flex max-w-sm flex-col items-start gap-spacing-04">
                                <Badge variant="success">Saved</Badge>
                                <p className="text-sm text-ink">The project name is stored.</p>
                                <Button onClick={() => setSaved(false)}>Back to the form</Button>
                            </div>
                        ) : (
                            <FormGroup title="Project">
                                <TextField label="Project name" defaultValue="Studio" hint="Shown on the project home." />
                                <TextField label="Description" defaultValue="The design system for North." />
                                <div className="flex gap-spacing-03">
                                    <Button onClick={() => setSaved(true)}>Save</Button>
                                    <Button variant="secondary">Cancel</Button>
                                </div>
                            </FormGroup>
                        )}
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets
                        items={[
                            "The fields belong to a single new record.",
                            "Related fields share a group. Save and Cancel sit at the end. Cancel does not submit.",
                        ]}
                    />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "A later answer depends on an earlier one. Use a wizard.",
                            "The record already exists. Use modifying a record.",
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={compositionNote} code={createRecordSnippet} />
            </DocPage>
        );
    },
};
