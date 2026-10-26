import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocDemo, DocList, DocPage, DocSection } from "../templates/doc";
import { Button } from "./button";
import { Fieldset } from "./fieldset";
import { TextField } from "./text-field";

const meta = {
    title: "Modules/Forms",
    component: Fieldset,
    parameters: { layout: "fullscreen" },
    args: {
        title: "Project",
        children: null,
    },
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FieldsetStory: Story = {
    name: "Fieldset",
    render: () => (
        <DocPage title="Fieldset" intro="A fieldset names one group of fields that belong together. The title is a noun, such as Project or Profile.">
            <DocSection title="Common practice">
                <DocList
                    items={[
                        { title: "One subject", body: "Name, description, and region of a project share one fieldset. A different subject gets its own fieldset." },
                        { title: "A single field", body: "One field does not need a fieldset. The field label is enough." },
                        { title: "The title is a noun", body: "Write Project, not Project details or Edit project." },
                    ]}
                />
            </DocSection>
            <DocSection title="Project">
                <DocDemo className="max-w-md">
                    <Fieldset title="Project">
                        <TextField label="Project name" defaultValue="Studio" />
                        <TextField label="Description" defaultValue="The design system for North." />
                    </Fieldset>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};

export const FieldsetDensities: Story = {
    name: "Fieldset, densities",
    render: () => (
        <DocPage title="Fieldset, densities" intro="Dense, standard, and wide change the space inside the group. One form uses one density.">
            <DocSection title="Common practice">
                <DocList
                    items={[
                        { title: "Match the page", body: "A tight tool uses dense. A normal page uses standard. A wide page uses wide." },
                        { title: "One density", body: "Do not mix dense and wide groups in the same form." },
                    ]}
                />
            </DocSection>
            <DocSection title="Densities">
                <DocDemo className="max-w-md">
                    <div className="flex flex-col gap-spacing-05">
                        <Fieldset title="Dense" density="dense">
                            <TextField label="Project name" defaultValue="Studio" />
                            <Button>Save</Button>
                        </Fieldset>
                        <Fieldset title="Standard" density="standard">
                            <TextField label="Project name" defaultValue="Studio" />
                            <Button>Save</Button>
                        </Fieldset>
                        <Fieldset title="Wide" density="wide">
                            <TextField label="Project name" defaultValue="Studio" />
                            <Button>Save</Button>
                        </Fieldset>
                    </div>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};

export const FieldsetError: Story = {
    name: "Fieldset, error",
    render: () => (
        <DocPage title="Fieldset, error" intro="The group error says what is wrong with the group. Each field still shows its own error.">
            <DocSection title="Common practice">
                <DocList
                    items={[
                        { title: "The group", body: "Use the group error when the fields fail together, such as a name and a description that are both required." },
                        { title: "The field", body: "Keep the field error on the field. The group error does not replace it." },
                        { title: "One field", body: "A single field error stays on that field. It does not need a group error." },
                    ]}
                />
            </DocSection>
            <DocSection title="Project">
                <DocDemo className="max-w-md">
                    <Fieldset title="Project" error="Name and description are required.">
                        <TextField label="Project name" required error="Enter a project name." />
                        <TextField label="Description" required error="Enter a description." />
                    </Fieldset>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
