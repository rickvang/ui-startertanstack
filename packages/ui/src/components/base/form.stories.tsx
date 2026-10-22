import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { TextField } from "./text-field";
import { Fieldset } from "./fieldset";
import { Form, FormSubmit } from "./form";
import { Flex } from "../layout/flex";

const meta = {
    title: "Modules/Forms/Form",
    component: Form,
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

export const Ready: Story = {
    name: "Ready",
    render: () => (
        <Form label="Project" onSubmit={() => undefined}>
            <ProjectFields />
        </Form>
    ),
};

export const Summary: Story = {
    name: "Summary",
    render: () => (
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
    ),
};

export const Pending: Story = {
    name: "Pending",
    render: () => (
        <Form label="Project" pending>
            <ProjectFields />
        </Form>
    ),
};
