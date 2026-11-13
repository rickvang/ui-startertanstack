import type { Meta, StoryObj } from "@storybook/react-vite";
import { emptyStateSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Button } from "./button";
import { EmptyState } from "./empty-state";
import { emptyStateAgentGuidance } from "./feedback.agent";

const meta = {
    title: "Components/Empty state",
    parameters: {
        layout: "fullscreen",
        agent: emptyStateAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyStateStory: Story = {
    name: "Empty state",
    render: () => (
        <DocPage title="Empty state" intro="Say the container is empty after a successful load. Put it inside the region that is empty.">
            <DocSection title="Example">
                <DocDemo className="flex max-w-md flex-col gap-spacing-06">
                    <EmptyState title="No members yet" action={<Button>Invite</Button>}>
                        Invite someone to get started.
                    </EmptyState>
                    <EmptyState title="No projects match">Try another filter, or clear the search.</EmptyState>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets
                    items={[
                        "The region loaded successfully and has nothing to show.",
                        "There is one clear next step, or a short explanation when no action fits.",
                    ]}
                />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Still waiting on data. Use Loader.",
                        "The load failed. Use Message, Banner, or Table error.",
                        "Feedback about a finished action. Use Message or Toast.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={emptyStateSnippet} />
        </DocPage>
    ),
};
