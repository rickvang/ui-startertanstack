import type { Meta, StoryObj } from "@storybook/react-vite";
import { dropdownSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Dropdown } from "./dropdown";
import { dropdownAgentGuidance } from "./navigation.agent";

const meta = {
    title: "Components/Dropdown",
    parameters: {
        layout: "fullscreen",
        agent: dropdownAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const DropdownStory: Story = {
    name: "Dropdown",
    render: () => (
        <DocPage title="Dropdown" intro="Offer a short list of actions from one control. Keep the list action-only.">
            <DocSection title="Example">
                <DocDemo>
                    <Dropdown label="Actions" items={["Edit", "Duplicate", "Delete"]} />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A list of actions only.", "Secondary commands that should stay out of the primary bar."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A small task panel with fields. Use Popover.",
                        "Primary navigation. Use Menu or Shell.",
                        "Choosing one value for a form. Use Select.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={dropdownSnippet} />
        </DocPage>
    ),
};
