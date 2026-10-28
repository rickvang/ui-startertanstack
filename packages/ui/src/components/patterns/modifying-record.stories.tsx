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
import { DocDemo, DocList, DocCodeSection, DocPage, DocSection } from "../templates/doc";

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
            <DocPage title="Modifying a record" intro="Changing a record starts on its detail. Edit opens the form with the current facts. Save returns to the detail. Cancel returns without a change.">
            <DocCodeSection note={compositionNote} code={modifyingRecordSnippet} />
                <DocSection title="When to use">
                    <DocList
                        items={[
                            { title: "The record exists", body: "The person is looking at one object and needs to change it." },
                            { title: "Edit, then the form", body: "The detail shows Edit. Save and Cancel belong to the form." },
                            { title: "Back to the detail", body: "After save, the detail shows the new facts. Cancel leaves them as they were." },
                        ]}
                    />
                </DocSection>
                <DocSection title="Member">
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
            </DocPage>
        );
    },
};
