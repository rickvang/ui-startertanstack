import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, paginationSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { paginationAgentGuidance } from "./navigation.agent";
import { Pagination } from "./pagination";

const meta = {
    title: "Components/Pagination",
    parameters: {
        layout: "fullscreen",
        agent: paginationAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const PaginationStory: Story = {
    name: "Pagination",
    render: () => (
        <DocPage title="Pagination" intro="Page through a long set when the product prefers discrete pages over continuous scroll.">
            <DocSection title="Example">
                <DocDemo>
                    <Pagination total={5} defaultPage={2} />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Too many parents to show at once and the product prefers pages.", "The person needs a stable page address for a slice of the list."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Short lists. Omit pagination.",
                        "Steady-height infinite scroll is the product choice. Prefer Table virtualize.",
                        "Filtering that shrinks the set to a short list. Show Empty state when nothing matches.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={paginationSnippet} />
        </DocPage>
    ),
};
