import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, selectSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { selectAgentGuidance } from "./inputs.agent";
import { Select } from "./select";

const roleOptions = [
    { value: "owner", label: "Owner" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
] as const;

const meta = {
    title: "Components/Select",
    parameters: {
        layout: "fullscreen",
        agent: selectAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectStory: Story = {
    name: "Select",
    render: () => (
        <DocPage title="Select" intro="Choose one option from a closed list. The options do not need to stay fully visible.">
            <DocSection title="Example">
                <DocDemo className="flex max-w-md flex-col gap-spacing-05">
                    <Select label="Role" defaultValue="editor" options={roleOptions} hint="Controls who can invite." />
                    <Select label="Role" layout="horizontal" className="w-full" defaultValue="viewer" options={roleOptions} />
                    <Select label="Role" defaultValue="owner" options={roleOptions} error="Pick a role before saving." />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets
                    items={[
                        "A closed set of options that does not need to stay fully visible.",
                        "The list is longer than a few choices, or the page is dense.",
                    ]}
                />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Few options that should stay on screen. Use Radio.",
                        "Several options may be true at once. Use Checkbox.",
                        "A setting that takes effect immediately. Use Switch.",
                        "Free text. Use Text field or Text area.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={selectSnippet} />
        </DocPage>
    ),
};
