import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { TextField } from "./text-field";
import { Fieldset } from "./fieldset";

const meta = {
    title: "Modules/Forms/Fieldset",
    component: Fieldset,
    args: {
        title: "Project",
        children: null,
    },
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Group: Story = {
    name: "Group",
    render: () => (
        <Fieldset title="Project" className="w-full max-w-md">
            <TextField label="Project name" defaultValue="Studio" />
            <TextField label="Description" defaultValue="The design system for North." />
        </Fieldset>
    ),
};

export const Densities: Story = {
    name: "Densities",
    render: () => (
        <div className="flex w-full max-w-md flex-col gap-spacing-05">
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
    ),
};

export const Error: Story = {
    name: "Error",
    render: () => (
        <Fieldset title="Project" error="Name and description are required." className="w-full max-w-md">
            <TextField label="Project name" required error="Enter a project name." />
            <TextField label="Description" required error="Enter a description." />
        </Fieldset>
    ),
};
