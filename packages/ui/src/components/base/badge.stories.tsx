import type { Meta, StoryObj } from "@storybook/react-vite";
import { badgeSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Badge } from "./badge";
import { badgeAgentGuidance } from "./controls.agent";

const meta = {
    title: "Components/Badge",
    parameters: {
        layout: "fullscreen",
        agent: badgeAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BadgeStory: Story = {
    name: "Badge",
    render: () => (
        <DocPage title="Badge" intro="Show a compact status or category on a row or header. Keep the label short.">
            <DocSection title="Example">
                <DocDemo className="flex flex-wrap items-center gap-spacing-04">
                    <Badge variant="success">Active</Badge>
                    <Badge variant="warning">Review</Badge>
                    <Badge variant="danger">Blocked</Badge>
                    <Badge variant="neutral">Draft</Badge>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A row or entity status that must stay scannable.", "A short category next to a title."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A paragraph of feedback. Use Message.",
                        "A page-wide notice. Use Banner.",
                        "A button label. Use Button.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={badgeSnippet} />
        </DocPage>
    ),
};
