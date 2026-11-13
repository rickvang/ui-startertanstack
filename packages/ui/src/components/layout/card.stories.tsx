import type { Meta, StoryObj } from "@storybook/react-vite";
import { cardSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { Avatar } from "../base/avatar";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { cardAgentGuidance } from "../base/inputs.agent";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Card } from "./card";

const activeTrend = ["h-spacing-02", "h-spacing-03", "h-spacing-02", "h-spacing-04", "h-spacing-03", "h-spacing-05", "h-spacing-04"] as const;

const meta = {
    title: "Components/Card",
    parameters: {
        layout: "fullscreen",
        agent: cardAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardStory: Story = {
    name: "Card",
    render: () => (
        <DocPage title="Card" intro="Present a self-contained scannable unit among peers. The surface is the item. Prefer space alone when a border does not help.">
            <DocSection title="Example">
                <DocDemo className="flex flex-col gap-spacing-05">
                    <div className="flex flex-wrap items-stretch gap-spacing-04">
                        <Card variant="outlined">Outlined</Card>
                        <Card variant="raised">Raised</Card>
                        <Card variant="quiet">Quiet</Card>
                    </div>
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
                        <Card className="max-w-xl">
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
                    </div>
                    <Card variant="quiet" className="max-w-xl gap-spacing-03">
                        <h2 className="text-sm font-semibold text-ink">Invite the rest of the team</h2>
                        <p className="text-sm text-muted">Three seats are still open.</p>
                        <Button variant="secondary" size="dense" className="self-start">
                            Invite
                        </Button>
                    </Card>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["The block should read as one unit in a set of peers.", "A metric, person, or next step that stands alone in a grid or row."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A full page region. Use Panel.",
                        "Decorating every stack with a card when space alone is enough.",
                        "Form chrome. Use Fieldset or Form group.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={cardSnippet} />
        </DocPage>
    ),
};
