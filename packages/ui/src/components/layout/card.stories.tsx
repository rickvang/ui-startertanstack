import type { Meta, StoryObj } from "@storybook/react-vite";
import { cardSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Card, type CardVariant } from "./card";

const variants = [
    ["outlined", "The line. The usual group on the page."],
    ["raised", "A shadow. The group should lift off the page."],
    ["quiet", "A soft fill and no line. Secondary content beside a stronger card."],
] as const satisfies ReadonlyArray<readonly [CardVariant, string]>;

const meta = {
    title: "Layout/Card",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardStory: Story = {
    name: "Card",
    render: () => (
        <DocPage title="Card" intro="A surface for one group of content. Outlined, raised, and quiet change the emphasis. The card still does not name a record or carry a status.">
            <DocSection title="Variants">
                <DocDemo>
                    <div className="grid gap-spacing-04 bg-canvas p-spacing-05 md:grid-cols-3">
                        {variants.map(([variant, detail]) => (
                            <div key={variant} className="flex flex-col gap-spacing-03">
                                <Card variant={variant}>
                                    <h2 className="text-sm font-semibold text-ink">North team</h2>
                                    <p className="text-sm text-muted">Three members. Last visit today.</p>
                                </Card>
                                <p className="text-sm text-muted">
                                    <span className="font-medium text-ink">{variant}.</span> {detail}
                                </p>
                            </div>
                        ))}
                    </div>
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
