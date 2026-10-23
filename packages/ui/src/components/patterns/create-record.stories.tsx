import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { TextField } from "../base/text-field";
import { FormGroup } from "../modules/form-group";
import { DocDemo, DocList, DocPage, DocSection } from "../templates/doc";

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
            <DocPage title="Create a record" intro="Creating a record fills one form, then reports the result. The person does not hunt for the action.">
                <DocSection title="When to use">
                    <DocList
                        items={[
                            { title: "One object", body: "The fields belong to a single record. Related fields share a group." },
                            { title: "Actions at the end", body: "Save closes the task. Cancel sits beside it and does not submit." },
                            { title: "Then the result", body: "After save, say what happened and offer one next step." },
                        ]}
                    />
                </DocSection>
                <DocSection title="Project">
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
            </DocPage>
        );
    },
};
