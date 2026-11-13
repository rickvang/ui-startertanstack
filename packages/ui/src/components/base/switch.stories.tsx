import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, switchSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { switchAgentGuidance } from "./inputs.agent";
import { Switch } from "./switch";

const meta = {
    title: "Components/Switch",
    parameters: {
        layout: "fullscreen",
        agent: switchAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const SwitchStory: Story = {
    name: "Switch",
    render: () => (
        <DocPage title="Switch" intro="Toggle a setting that takes effect now. The page stays usable.">
            <DocSection title="Example">
                <DocDemo className="flex max-w-md flex-col gap-spacing-04">
                    <Switch label="Reduced motion" defaultChecked />
                    <Switch label="Email digests" />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A setting that takes effect immediately.", "The person should see on versus off without opening a menu."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A form fact submitted later. Use Checkbox.",
                        "Choosing among more than two values. Use Radio or Select.",
                        "A destructive confirm. Use Dialog.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={switchSnippet} />
        </DocPage>
    ),
};
