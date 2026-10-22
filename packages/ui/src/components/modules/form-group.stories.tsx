import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../base/button";
import { Checkbox } from "../base/checkbox";
import { Fieldset } from "../base/fieldset";
import { Form, FormSubmit } from "../base/form";
import { RadioGroup } from "../base/radio";
import { Select } from "../base/select";
import { Switch } from "../base/switch";
import { TextArea } from "../base/text-area";
import { TextField } from "../base/text-field";
import { Flex } from "../layout/flex";
import { DocList, DocPage, DocSection } from "../templates/doc";

const meta = {
    title: "Modules/Forms",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type FormLayout = "horizontal" | "stacked";

function choiceLayout(layout: FormLayout): "inline" | "stacked" {
    switch (layout) {
        case "horizontal":
            return "inline";
        case "stacked":
            return "stacked";
        default: {
            const exhaustive: never = layout;
            return exhaustive;
        }
    }
}

type FieldErrors = {
    name?: string;
    region?: string;
};

const nameError = "Enter a project name.";
const regionError = "Choose a region.";

function errorSummary(errors: FieldErrors) {
    const messages = [errors.name, errors.region].filter((message): message is string => message !== undefined);
    if (messages.length < 2) {
        return undefined;
    }

    return (
        <ul className="list-disc pl-spacing-04">
            {messages.map((message) => (
                <li key={message}>{message}</li>
            ))}
        </ul>
    );
}

function ProjectForm({ layout }: { layout: FormLayout }) {
    const fieldId = (name: string) => `project-${layout}-${name}`;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [region, setRegion] = useState("");
    const [errors, setErrors] = useState<FieldErrors>({});
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (!pending) {
            return;
        }

        const timer = window.setTimeout(() => setPending(false), 800);
        return () => window.clearTimeout(timer);
    }, [pending]);

    function updateName(value: string) {
        setName(value);
        setErrors((current) => ({ ...current, name: value.trim() === "" ? current.name : undefined }));
    }

    function updateRegion(value: string) {
        setRegion(value);
        setErrors((current) => ({ ...current, region: value === "" ? current.region : undefined }));
    }

    function reset() {
        setName("");
        setDescription("");
        setRegion("");
        setErrors({});
        setPending(false);
    }

    return (
        <Form
            label={`Project, ${layout}`}
            error={errorSummary(errors)}
            pending={pending}
            className={layout === "horizontal" ? "max-w-xl" : "max-w-md"}
            onSubmit={() => {
                const next: FieldErrors = {
                    name: name.trim() === "" ? nameError : undefined,
                    region: region === "" ? regionError : undefined,
                };
                setErrors(next);
                if (next.name) {
                    document.getElementById(fieldId("name"))?.focus();
                    return;
                }
                if (next.region) {
                    document.getElementById(fieldId("region"))?.focus();
                    return;
                }
                setPending(true);
            }}
        >
            <Fieldset title="Project">
                <TextField
                    id={fieldId("name")}
                    label="Project name"
                    layout={layout}
                    value={name}
                    onChange={(event) => updateName(event.target.value)}
                    hint="Shown on the project home."
                    error={errors.name}
                    required
                />
                <TextArea
                    id={fieldId("description")}
                    label="Description"
                    layout={layout}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    hint="What this project is for."
                    rows={3}
                />
                <Select
                    id={fieldId("region")}
                    label="Region"
                    layout={layout}
                    value={region}
                    onChange={(event) => updateRegion(event.target.value)}
                    error={errors.region}
                    required
                    options={[
                        { value: "", label: "Choose a region" },
                        { value: "hangzhou", label: "Hangzhou" },
                        { value: "berlin", label: "Berlin" },
                        { value: "austin", label: "Austin" },
                    ]}
                />
            </Fieldset>
            <Fieldset title="Access">
                <RadioGroup
                    label="Visibility"
                    layout={layout}
                    name={fieldId("visibility")}
                    defaultValue="team"
                    options={[
                        { value: "private", label: "Private" },
                        { value: "team", label: "Team" },
                        { value: "public", label: "Public" },
                    ]}
                />
                <Checkbox label="Email members" layout={choiceLayout(layout)} />
                <Switch label="Active" layout={choiceLayout(layout)} defaultChecked />
            </Fieldset>
            <Flex gap="sm">
                <FormSubmit>Save</FormSubmit>
                <Button variant="secondary" type="button" onClick={reset}>
                    Cancel
                </Button>
            </Flex>
        </Form>
    );
}

function LongLabels() {
    return (
        <Fieldset title="Account" className="max-w-xl">
            <TextField label="Account" layout="horizontal" defaultValue="North" />
            <TextField label="Registered billing account owner" layout="horizontal" defaultValue="Alex Kim" hint="The person who receives invoices." />
            <TextField label="north-america-enterprise-workspace" layout="horizontal" defaultValue="NA-ENT" />
        </Fieldset>
    );
}

export const Forms: Story = {
    name: "Forms",
    render: () => (
        <DocPage title="Forms" intro="A form collects the fields for one record. Related fields sit in a group. Labels can sit beside the value or above it. Save checks the record, lists the errors together when more than one field fails, and keeps Save unavailable while the save is in progress.">
            <DocSection title="Horizontal">
                <ProjectForm layout="horizontal" />
            </DocSection>
            <DocSection title="Vertical">
                <ProjectForm layout="stacked" />
            </DocSection>
            <DocSection title="Long labels">
                <DocList
                    items={[
                        { title: "Wrap in the column", body: "The label column stays one width. A long label wraps inside it. The value stays on the same left edge, level with the first line." },
                        { title: "Keep the name short", body: "Write the label as a short name. Put the longer explanation in the hint under the value." },
                        { title: "Use vertical", body: "When the labels in a form are usually too long for one line, use the vertical set." },
                        { title: "Break a long word", body: "A label with no place to break still breaks inside the column, so it does not cover the value." },
                    ]}
                />
                <LongLabels />
            </DocSection>
        </DocPage>
    ),
};
