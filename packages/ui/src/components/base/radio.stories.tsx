import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, radioSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { radioAgentGuidance } from "./inputs.agent";
import { RadioGroup } from "./radio";

const meta = {
    title: "Components/Radio",
    parameters: {
        layout: "fullscreen",
        agent: radioAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const RadioStory: Story = {
    name: "Radio",
    render: () => (
        <DocPage title="Radio" intro="Choose exactly one option from a small set that stays visible on the page.">
            <DocSection title="Example">
                <DocDemo className="max-w-md">
                    <RadioGroup
                        label="Visibility"
                        defaultValue="members"
                        options={[
                            { value: "private", label: "Private" },
                            { value: "members", label: "Members" },
                            { value: "public", label: "Public" },
                        ]}
                        hint="Who can open this project."
                    />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Few options that should stay on screen.", "Exactly one must be selected."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A long list of options. Use Select.",
                        "Independent toggles. Use Checkbox.",
                        "An immediate on/off setting. Use Switch.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={radioSnippet} />
        </DocPage>
    ),
};
