import type { Meta, StoryObj } from "@storybook/react-vite";
import { descriptionListSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { DescriptionList } from "./description-list";
import { descriptionListAgentGuidance } from "./inputs.agent";

const items = [
    { label: "Role", value: "Owner" },
    { label: "Lives in", value: "Hangzhou" },
    { label: "Joined", value: "March 2024" },
] as const;

const meta = {
    title: "Components/Description list",
    parameters: {
        layout: "fullscreen",
        agent: descriptionListAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const DescriptionListStory: Story = {
    name: "Description list",
    render: () => (
        <DocPage title="Description list" intro="Show labeled facts for one record as term and description pairs.">
            <DocSection title="Example">
                <DocDemo className="flex max-w-xl flex-col gap-spacing-06">
                    <DescriptionList items={items} />
                    <DescriptionList items={items} layout="horizontal" align="end" className="w-full" />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Read-only key facts for one object.", "Detail views that pair a label with a value."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Editable fields. Use a form.",
                        "Many records. Use a table.",
                        "Grouped sections with titles. Use Detail group.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={descriptionListSnippet} />
        </DocPage>
    ),
};
