import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, stepsSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { stepsAgentGuidance } from "./navigation.agent";
import { Steps } from "./steps";

const meta = {
    title: "Components/Steps",
    parameters: {
        layout: "fullscreen",
        agent: stepsAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const StepsStory: Story = {
    name: "Steps",
    render: () => (
        <DocPage title="Steps" intro="Show a linear process on one record. The decision sits beside the work.">
            <DocSection title="Example">
                <DocDemo className="max-w-lg">
                    <Steps current={1} items={["Details", "Review", "Invite"]} />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["The record has a process with ordered stages.", "The person should see progress without leaving the page."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Weakly related sections with no order. Use Tabs.",
                        "A multi-page create flow. Use the Wizard pattern.",
                        "Top-level product areas. Use Shell navigation.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={stepsSnippet} />
        </DocPage>
    ),
};
