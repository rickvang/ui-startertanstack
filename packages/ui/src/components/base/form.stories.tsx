import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocDemo, DocList, DocPage, DocSection } from "../templates/doc";
import { Button } from "./button";
import { Fieldset } from "./fieldset";
import { Form, FormSubmit } from "./form";
import { TextField } from "./text-field";
import { Flex } from "../layout/flex";

const meta = {
    title: "Modules/Forms",
    component: Form,
    parameters: { layout: "fullscreen" },
    args: {
        children: null,
    },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

function ProjectFields() {
    return (
        <Fieldset title="Project" className="w-full max-w-md">
            <TextField label="Project name" defaultValue="Studio" required />
            <Flex gap="sm">
                <FormSubmit>Save</FormSubmit>
                <Button variant="secondary" type="button">
                    Cancel
                </Button>
            </Flex>
        </Fieldset>
    );
}

export const FormReady: Story = {
    name: "Form, ready",
    render: () => (
        <DocPage title="Form, ready" intro="The form owns the record. Save submits it. Cancel does not.">
            <DocSection title="Common practice">
                <DocList
                    items={[
                        { title: "Save submits", body: "Save is the submit button. It belongs inside the form." },
                        { title: "Cancel does not submit", body: "Cancel is a button with type button. It leaves the record as it was." },
                        { title: "One record", body: "One form edits one record. A second record gets its own form." },
                    ]}
                />
            </DocSection>
            <DocSection title="Project">
                <DocDemo className="max-w-md">
                    <Form label="Project" onSubmit={() => undefined}>
                        <ProjectFields />
                    </Form>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};

export const FormSummary: Story = {
    name: "Form, summary",
    render: () => (
        <DocPage title="Form, summary" intro="When more than one field fails, the summary sits at the top of the form. Each field keeps its own error.">
            <DocSection title="Common practice">
                <DocList
                    items={[
                        { title: "More than one", body: "Show the summary when two or more fields fail. One failure stays on its field." },
                        { title: "At the top", body: "The summary is the first thing in the form, before the fieldset." },
                        { title: "Same words", body: "The summary names the failures. It does not replace the error on the field." },
                    ]}
                />
            </DocSection>
            <DocSection title="Project">
                <DocDemo className="max-w-md">
                    <Form label="Project" error="Enter a project name.">
                        <Fieldset title="Project" className="w-full max-w-md">
                            <TextField label="Project name" required error="Enter a project name." />
                            <Flex gap="sm">
                                <FormSubmit>Save</FormSubmit>
                                <Button variant="secondary" type="button">
                                    Cancel
                                </Button>
                            </Flex>
                        </Fieldset>
                    </Form>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};

export const FormPending: Story = {
    name: "Form, pending",
    render: () => (
        <DocPage title="Form, pending" intro="While the save is in progress, Save is unavailable and the form is marked busy.">
            <DocSection title="Common practice">
                <DocList
                    items={[
                        { title: "Save waits", body: "A second click does not send the record again." },
                        { title: "The page stays", body: "The fields remain visible. The person can read what was sent." },
                    ]}
                />
            </DocSection>
            <DocSection title="Project">
                <DocDemo className="max-w-md">
                    <Form label="Project" pending>
                        <ProjectFields />
                    </Form>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
