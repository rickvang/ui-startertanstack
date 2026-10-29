import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    articleGridSnippet,
    articleRowSnippet,
    cardSnippet,
    compositionNote,
    emptyContainerSnippet,
    keyValueSnippet,
    libraryExportNote,
    metricsSnippet,
    panelSnippet,
} from "../../../.storybook/story-snippets";
import { cx } from "../../utils/cx";
import { Button } from "../base/button";
import { EmptyState } from "../base/empty-state";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { Card } from "./card";

function Bone({ className }: { className: string }) {
    return <span className={cx("block rounded-sm bg-line", className)} />;
}

function Canvas({ children }: { children: ReactNode }) {
    return (
        <DocDemo bleed className="bg-canvas p-spacing-05">
            {children}
        </DocDemo>
    );
}

function Trend({ heights }: { heights: readonly string[] }) {
    return (
        <div className="flex h-spacing-05 items-end gap-px" aria-hidden="true">
            {heights.map((height, index) => (
                <Bone key={index} className={cx("w-spacing-02", height)} />
            ))}
        </div>
    );
}

function MetricBones({ valueWidth, trend }: { valueWidth: string; trend: readonly string[] }) {
    return (
        <>
            <Bone className="h-spacing-03 w-spacing-07" />
            <div className="flex items-end gap-spacing-04">
                <Bone className={cx("h-spacing-07", valueWidth)} />
                <Trend heights={trend} />
            </div>
            <Bone className="h-spacing-04 w-spacing-09" />
        </>
    );
}

function Pair({ labelWidth, valueWidth }: { labelWidth: string; valueWidth: string }) {
    return (
        <div className="flex items-baseline justify-between gap-spacing-05">
            <Bone className={cx("h-spacing-03", labelWidth)} />
            <Bone className={cx("h-spacing-04", valueWidth)} />
        </div>
    );
}

function ArticleCard() {
    return (
        <Card className="min-w-spacing-13 flex-1 gap-0 overflow-hidden p-0">
            <Bone className="h-spacing-11 w-full rounded-none" />
            <div className="flex flex-col gap-spacing-03 p-spacing-05">
                <Bone className="h-spacing-04 w-spacing-12" />
                <Bone className="h-spacing-03 w-full" />
                <Bone className="h-spacing-03 w-3/5" />
            </div>
        </Card>
    );
}

function NestedCard() {
    return (
        <Card variant="quiet" className="gap-spacing-02">
            <Bone className="h-spacing-04 w-spacing-10" />
            <Bone className="h-spacing-03 w-4/5" />
        </Card>
    );
}

const rising = ["h-spacing-02", "h-spacing-03", "h-spacing-02", "h-spacing-04", "h-spacing-03", "h-spacing-05", "h-spacing-04"] as const;
const falling = ["h-spacing-05", "h-spacing-04", "h-spacing-04", "h-spacing-03", "h-spacing-03", "h-spacing-02", "h-spacing-02"] as const;

const meta = {
    title: "Layout/Content containers",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Panel: Story = {
    name: "Panel",
    render: () => (
        <DocPage title="Panel" intro="A panel holds a group. The surface is the group, not one of the items. It can house cards, or it can hold the content directly.">
            <DocSection title="Example">
                <DocParagraph>A title and a set of facts that belong together. The panel is the unit.</DocParagraph>
                <Canvas>
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-11" />
                        <div className="flex flex-col gap-spacing-03">
                            <Pair labelWidth="w-spacing-07" valueWidth="w-spacing-09" />
                            <Pair labelWidth="w-spacing-08" valueWidth="w-spacing-10" />
                            <Pair labelWidth="w-spacing-06" valueWidth="w-spacing-08" />
                        </div>
                    </Card>
                </Canvas>
                <DocParagraph>The cards sit inside the group. Each card is still an item.</DocParagraph>
                <Canvas>
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-10" />
                        <div className="flex flex-col gap-spacing-04">
                            <NestedCard />
                            <NestedCard />
                            <NestedCard />
                        </div>
                    </Card>
                </Canvas>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["The group is the unit. Scan the panel as one set.", "Cards, metrics, or pairs sit inside it."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["A single number, person, or next step. Use a card.", "A long list with columns to compare. Use a table."]} />
            </DocSection>
            <DocCodeSection note={compositionNote} code={panelSnippet} />
        </DocPage>
    ),
};

export const CardStory: Story = {
    name: "Card",
    render: () => (
        <DocPage title="Card" intro="A card is one item that stands on its own. The surface is the item. Outlined, raised, and quiet treatments are in Components / Card.">
            <DocSection title="Example">
                <DocParagraph>One measure, one piece of writing, one person, or one next step. The card is the thing.</DocParagraph>
                <Canvas>
                    <Card className="max-w-64 gap-spacing-03">
                        <MetricBones valueWidth="w-spacing-08" trend={rising} />
                    </Card>
                </Canvas>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["The item is the unit. A panel can still hold several cards.", "The cards stay items. The panel is the group."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["A group of unrelated items. Use a panel.", "Many people of the same kind, with columns to compare. Use a table."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={cardSnippet} />
        </DocPage>
    ),
};

export const Empty: Story = {
    name: "Empty",
    render: () => (
        <DocPage title="Empty" intro="An empty group is a real state. The page loaded and there is nothing in it yet. Empty state sits inside the container.">
            <DocSection title="Example">
                <DocParagraph>Say what is missing. Offer the same action the full page uses.</DocParagraph>
                <Canvas>
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-11" />
                        <EmptyState title="No members yet" action={<Button>Invite</Button>}>
                            Invite someone to get started.
                        </EmptyState>
                    </Card>
                </Canvas>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["The page loaded and the group has no items.", "If the full list invites a member, the empty list invites a member."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A note about something that just happened. Use Message.",
                        "A table with no rows. Use Table empty copy.",
                        "The page cannot do the task. That is an exception, not empty.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={compositionNote} code={emptyContainerSnippet} />
        </DocPage>
    ),
};

export const Metrics: Story = {
    name: "Metrics",
    render: () => (
        <DocPage title="Metrics" intro="A few numbers that belong together. One panel holds the measures so they can be scanned as a group. Each measure can be a quiet card inside it.">
            <DocSection title="Example">
                <DocParagraph>Each tile is a label, a number, and a short trend. The panel is the group.</DocParagraph>
                <Canvas>
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-10" />
                        <div className="grid gap-spacing-04 md:grid-cols-3">
                            <Card variant="quiet" className="gap-spacing-03">
                                <MetricBones valueWidth="w-spacing-08" trend={rising} />
                            </Card>
                            <Card variant="quiet" className="gap-spacing-03">
                                <MetricBones valueWidth="w-spacing-06" trend={falling} />
                            </Card>
                            <Card variant="quiet" className="gap-spacing-03">
                                <MetricBones valueWidth="w-spacing-07" trend={rising} />
                            </Card>
                        </div>
                    </Card>
                </Canvas>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A few numbers that belong together.", "Keep the measures in one panel so they can be scanned together."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["A chart, a list, and a number in the same tile.", "A record with a name and a status. That is a detail."]} />
            </DocSection>
            <DocCodeSection note={compositionNote} code={metricsSnippet} />
        </DocPage>
    ),
};

export const KeyValue: Story = {
    name: "Key-value",
    render: () => (
        <DocPage title="Key-value" intro="Facts about one object. Labels and values sit in one panel. Description list is the control that fills it.">
            <DocSection title="Example">
                <DocParagraph>A short set of labels and values. Scan down the panel.</DocParagraph>
                <Canvas>
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-09" />
                        <div className="flex flex-col gap-spacing-04">
                            <Pair labelWidth="w-spacing-07" valueWidth="w-spacing-10" />
                            <Pair labelWidth="w-spacing-08" valueWidth="w-spacing-09" />
                            <Pair labelWidth="w-spacing-06" valueWidth="w-spacing-11" />
                            <Pair labelWidth="w-spacing-09" valueWidth="w-spacing-08" />
                        </div>
                    </Card>
                </Canvas>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Facts about one object.", "The values are short enough to scan down the panel."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["Many objects of the same kind. Use a table.", "A long paragraph in the value.", "The person is editing the facts. Use a record pattern."]} />
            </DocSection>
            <DocCodeSection note={compositionNote} code={keyValueSnippet} />
        </DocPage>
    ),
};

export const ArticleRow: Story = {
    name: "Article row",
    render: () => (
        <DocPage title="Article row" intro="A few pieces of writing. The panel holds the cards in a line.">
            <DocSection title="Example">
                <DocParagraph>Two or three notes, updates, or posts. Each card has a picture band and a title.</DocParagraph>
                <Canvas>
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-10" />
                        <div className="flex gap-spacing-04 overflow-x-auto">
                            <ArticleCard />
                            <ArticleCard />
                            <ArticleCard />
                        </div>
                    </Card>
                </Canvas>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A few pieces of writing sit beside each other.", "The panel holds the row. The cards are the pieces of writing."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["Many posts. Use a grid.", "A long document. That is a page."]} />
            </DocSection>
            <DocCodeSection note={compositionNote} code={articleRowSnippet} />
        </DocPage>
    ),
};

export const ArticleGrid: Story = {
    name: "Article grid",
    render: () => (
        <DocPage title="Article grid" intro="Many pieces of writing. The panel holds the cards in columns.">
            <DocSection title="Example">
                <DocParagraph>Notes, updates, or posts that wrap. Each card is one piece of writing.</DocParagraph>
                <Canvas>
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-10" />
                        <div className="grid gap-spacing-04 sm:grid-cols-2">
                            <ArticleCard />
                            <ArticleCard />
                            <ArticleCard />
                            <ArticleCard />
                        </div>
                    </Card>
                </Canvas>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Many pieces of writing that wrap.", "The panel holds the grid. The cards are the pieces of writing."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["Two items. Use a row.", "People of the same kind, with columns to compare. Use a table."]} />
            </DocSection>
            <DocCodeSection note={compositionNote} code={articleGridSnippet} />
        </DocPage>
    ),
};
