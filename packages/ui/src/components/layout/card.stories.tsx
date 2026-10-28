import type { Meta, StoryObj } from "@storybook/react-vite";
import { cardSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { Avatar } from "../base/avatar";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { Card } from "./card";

const activeTrend = ["h-spacing-02", "h-spacing-03", "h-spacing-02", "h-spacing-04", "h-spacing-03", "h-spacing-05", "h-spacing-04"] as const;
const overdueTrend = ["h-spacing-02", "h-spacing-02", "h-spacing-03", "h-spacing-03", "h-spacing-04", "h-spacing-04", "h-spacing-05"] as const;

const meta = {
    title: "Components/Card",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardStory: Story = {
    name: "Card",
    render: () => (
        <DocPage title="Card" intro="A surface for one group of content. Outlined, raised, and quiet change the emphasis. The card still does not name a record or carry a status.">
            <DocCodeSection note={libraryExportNote} code={cardSnippet} />
            <DocSection title="Example">
                <DocParagraph>Outlined keeps the line. Raised adds a shadow. Quiet uses a soft fill and no line.</DocParagraph>
                <DocDemo className="bg-canvas">
                    <div className="grid gap-spacing-04 md:grid-cols-3">
                        <Card>
                            <h2 className="text-sm font-semibold text-ink">North team</h2>
                            <p className="text-sm text-muted">Three members. Last visit today.</p>
                        </Card>
                        <Card variant="raised">
                            <h2 className="text-sm font-semibold text-ink">North team</h2>
                            <p className="text-sm text-muted">Three members. Last visit today.</p>
                        </Card>
                        <Card variant="quiet">
                            <h2 className="text-sm font-semibold text-ink">North team</h2>
                            <p className="text-sm text-muted">Three members. Last visit today.</p>
                        </Card>
                    </div>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A few related facts should read as one object.", "The group has no status of its own."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["One record, with a name and a status. Use DetailCard.", "Many records of the same kind. Use a table."]} />
            </DocSection>
            <DocSection title="Metric">
                <DocParagraph>One number, what it is compared with, and whether that change is good.</DocParagraph>
                <DocDemo className="bg-canvas">
                    <div className="grid gap-spacing-03 sm:grid-cols-2">
                        <Card className="gap-spacing-02 p-spacing-04">
                            <p className="text-xs text-muted">Active</p>
                            <div className="flex items-end gap-spacing-04">
                                <p className="text-lg font-semibold text-ink tabular-nums">24</p>
                                <div className="flex h-spacing-05 items-end gap-px" aria-hidden="true">
                                    {activeTrend.map((height, index) => (
                                        <span key={index} className={`w-spacing-02 bg-accent ${height}`} />
                                    ))}
                                </div>
                            </div>
                            <Badge className="self-start" variant="success">
                                +3 this week
                            </Badge>
                        </Card>
                        <Card className="gap-spacing-02 p-spacing-04">
                            <p className="text-xs text-muted">Overdue</p>
                            <div className="flex items-end gap-spacing-04">
                                <p className="text-lg font-semibold text-ink tabular-nums">4</p>
                                <div className="flex h-spacing-05 items-end gap-px" aria-hidden="true">
                                    {overdueTrend.map((height, index) => (
                                        <span key={index} className={`w-spacing-02 bg-danger ${height}`} />
                                    ))}
                                </div>
                            </div>
                            <Badge className="self-start" variant="danger">
                                +1 this week
                            </Badge>
                        </Card>
                    </div>
                </DocDemo>
            </DocSection>
            <DocSection title="Article">
                <DocParagraph>A picture band, a title, a short line, and who wrote it.</DocParagraph>
                <DocDemo className="max-w-xl bg-canvas">
                    <Card className="overflow-hidden p-0">
                        <div className="h-spacing-11 bg-accent-subtle" />
                        <div className="flex flex-col gap-spacing-03 p-spacing-05">
                            <Badge className="self-start">Note</Badge>
                            <h2 className="text-sm font-semibold text-ink">How the North team reviews work</h2>
                            <p className="text-sm text-muted">Who signs off before a visit is marked done.</p>
                            <p className="text-xs text-muted">Ada North · Today</p>
                        </div>
                    </Card>
                </DocDemo>
            </DocSection>
            <DocSection title="Person">
                <DocParagraph>A face, a name, a role, and a status.</DocParagraph>
                <DocDemo className="max-w-xl bg-canvas">
                    <Card>
                        <div className="flex items-center gap-spacing-03">
                            <Avatar name="Ada North" />
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-ink">Ada North</p>
                                <p className="text-sm text-muted">Reviewer</p>
                            </div>
                            <Badge className="ml-auto" variant="success">
                                Active
                            </Badge>
                        </div>
                    </Card>
                </DocDemo>
            </DocSection>
            <DocSection title="Next step">
                <DocParagraph>One action, on the quieter surface.</DocParagraph>
                <DocDemo className="max-w-xl bg-canvas">
                    <Card variant="quiet">
                        <h2 className="text-sm font-semibold text-ink">Invite the rest of the team</h2>
                        <p className="text-sm text-muted">Three seats are still open.</p>
                        <Button variant="secondary" size="dense" className="self-start">
                            Invite
                        </Button>
                    </Card>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
