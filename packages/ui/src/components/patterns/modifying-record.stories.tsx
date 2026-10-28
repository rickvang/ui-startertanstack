import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, modifyingRecordSnippet } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { DescriptionList } from "../base/description-list";
import { DetailGroup } from "../base/detail-group";
import { Fieldset } from "../base/fieldset";
import { Form, FormSubmit } from "../base/form";
import { TextField } from "../base/text-field";
import { DetailCard } from "../modules/detail-card";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";

const meta = {
    title: "Patterns/Modifying a record",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ModifyingRecord: Story = {
    name: "Modifying a record",
    render: () => {
        const [editing, setEditing] = useState(false);
        const [role, setRole] = useState("Owner");
        const [draft, setDraft] = useState(role);

        return (
            <DocPage title="Modifying a record" intro="Edit opens the form from the detail. Save returns to the detail. Cancel leaves the facts as they were.">
                <DocSection title="Example">
                    <DocParagraph>The detail shows Edit. Save and Cancel belong to the form.</DocParagraph>
                    <DocDemo className="max-w-xl">
                        {editing ? (
                            <Form
                                label="Member"
                                className="max-w-xl"
                                onSubmit={() => {
                                    setRole(draft.trim() === "" ? role : draft);
                                    setEditing(false);
                                }}
                            >
                                <Fieldset title="Profile">
                                    <TextField label="Role" layout="horizontal" value={draft} onChange={(event) => setDraft(event.target.value)} />
                                </Fieldset>
                                <div className="flex gap-spacing-03">
                                    <FormSubmit>Save</FormSubmit>
                                    <Button variant="secondary" type="button" onClick={() => setEditing(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        ) : (
                            <DetailCard
                                title="Alex Kim"
                                status="Active"
                                statusVariant="success"
                                action={
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            setDraft(role);
                                            setEditing(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                }
                            >
                                <DetailGroup title="Profile">
                                    <DescriptionList items={[{ label: "Role", value: role }]} layout="horizontal" align="start" />
                                </DetailGroup>
                            </DetailCard>
                        )}
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["The person is looking at one existing object and needs to change several facts."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "One fact, where it sits. Use inline edit.",
                            "The record does not exist yet. Use create a record.",
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={compositionNote} code={modifyingRecordSnippet} />
            </DocPage>
        );
    },
};
