import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../base/avatar";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { DocDemo, DocPage, DocSection } from "../templates/doc";
import { Card } from "./card";

const activeTrend = ["h-spacing-02", "h-spacing-03", "h-spacing-02", "h-spacing-04", "h-spacing-03", "h-spacing-05", "h-spacing-04"] as const;
const overdueTrend = ["h-spacing-02", "h-spacing-02", "h-spacing-03", "h-spacing-03", "h-spacing-04", "h-spacing-04", "h-spacing-05"] as const;

const meta = {
    title: "Layout/Card",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardLayouts: Story = {
    name: "Card",
    render: () => (
        <DocPage title="Card layouts" intro="Ways to fill a card. The surface itself, and its outlined, raised, and quiet treatments, live under Components.">
            <DocSection title="Examples">
                <DocDemo>
                    <div className="grid gap-spacing-05 bg-canvas p-spacing-05 lg:grid-cols-2">
                        <div className="flex flex-col gap-spacing-03">
                            <div className="grid grid-cols-2 gap-spacing-03">
                                <Card className="gap-spacing-02 p-spacing-04">
                                    <p className="text-xs text-muted">Active</p>
                                    <div className="flex items-end justify-between gap-spacing-03">
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
                                    <div className="flex items-end justify-between gap-spacing-03">
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
                            <p className="text-sm text-muted">
                                <span className="font-medium text-ink">Metric.</span> One number, what it is compared with, and whether that change is good. More overdue is worse, so the rise is danger.
                            </p>
                        </div>
                        <div className="flex flex-col gap-spacing-03">
                            <Card className="overflow-hidden p-0">
                                <div className="h-spacing-11 bg-accent-subtle" />
                                <div className="flex flex-col gap-spacing-03 p-spacing-05">
                                    <Badge className="self-start">Note</Badge>
                                    <h2 className="text-sm font-semibold text-ink">How the North team reviews work</h2>
                                    <p className="text-sm text-muted">Who signs off before a visit is marked done.</p>
                                    <p className="text-xs text-muted">Ada North · Today</p>
                                </div>
                            </Card>
                            <p className="text-sm text-muted">
                                <span className="font-medium text-ink">Article.</span> A picture band, a title, a short line, and who wrote it.
                            </p>
                        </div>
                        <div className="flex flex-col gap-spacing-03">
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
                            <p className="text-sm text-muted">
                                <span className="font-medium text-ink">Person.</span> A face, a name, a role, and a status.
                            </p>
                        </div>
                        <div className="flex flex-col gap-spacing-03">
                            <Card variant="quiet">
                                <h2 className="text-sm font-semibold text-ink">Invite the rest of the team</h2>
                                <p className="text-sm text-muted">Three seats are still open.</p>
                                <Button variant="secondary" size="dense" className="self-start">
                                    Invite
                                </Button>
                            </Card>
                            <p className="text-sm text-muted">
                                <span className="font-medium text-ink">Next step.</span> One action, on the quieter surface so it does not compete with the numbers.
                            </p>
                        </div>
                    </div>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
