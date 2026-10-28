import type { Meta, StoryObj } from "@storybook/react-vite";
import { cardSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Card } from "./card";

const meta = {
    title: "Layout/Card",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardStory: Story = {
    name: "Card",
    render: () => (
        <DocPage title="Card" intro="A surface for one group of content. It does not name a record or carry a status.">
            <DocSection title="Example">
                <DocDemo className="max-w-xl">
                    <Card>
                        <h2 className="text-sm font-semibold text-ink">North team</h2>
                        <p className="text-sm text-muted">Three members. Last visit today.</p>
                    </Card>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A few related facts should read as one object.", "The group has no status of its own."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["One record, with a name and a status. Use DetailCard.", "Many records of the same kind. Use a table."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={cardSnippet} />
        </DocPage>
    ),
};
