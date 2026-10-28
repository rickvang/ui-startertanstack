import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, contentContainerSnippet } from "../../../.storybook/story-snippets";
import { cx } from "../../utils/cx";
import { DocCodeSection, DocDemo, DocList, DocNote, DocPage, DocSection, DocWhenAvoid } from "../templates/doc";
import { Card } from "./card";

function Bone({ className }: { className: string }) {
    return <span className={cx("block rounded-sm bg-line", className)} />;
}

function ContainerFrame({ name, when, avoid, children }: { name: string; when: string; avoid: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-spacing-05">
            <DocWhenAvoid when={when} avoid={avoid} />
            <DocDemo bleed className="bg-canvas p-spacing-05">
                {children}
            </DocDemo>
            <h3 className="text-sm font-medium text-ink">{name}</h3>
        </div>
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

const rising = ["h-spacing-02", "h-spacing-03", "h-spacing-02", "h-spacing-04", "h-spacing-03", "h-spacing-05", "h-spacing-04"] as const;
const falling = ["h-spacing-05", "h-spacing-04", "h-spacing-04", "h-spacing-03", "h-spacing-03", "h-spacing-02", "h-spacing-02"] as const;

const meta = {
    title: "Layout/Content containers",
    component: Card,
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
    args: { children: "Content" },
    render: () => (
        <DocPage title="Content containers" intro="A content container holds a group. It can be a panel that houses cards, or a card that is the group. Pick it from how the content is scanned. The surface, and its outlined, raised, and quiet treatments, are in Components / Card.">
            <DocCodeSection note={compositionNote} code={contentContainerSnippet} />
            <DocSection title="How to choose">
                <DocList
                    items={[
                        { title: "Several related items, read as one group", body: "Panel. The surface holds the group. Cards, metrics, or pairs sit inside it." },
                        { title: "One item that stands on its own", body: "Card. The surface is the item. Kinds that fill a card are in Components / Card." },
                        { title: "A few numbers", body: "Metrics. One panel holds the measures so they can be scanned together." },
                        { title: "Facts about one object", body: "Key-value. Labels and values in one panel. Not a table." },
                        { title: "A few pieces of writing", body: "Article row. Cards sit in a line inside the panel." },
                        { title: "Many pieces of writing", body: "Article grid. Cards sit in columns inside the panel." },
                    ]}
                />
            </DocSection>
            <DocSection title="Panel">
                <DocNote>Use this when the group is the unit. The panel holds the content. It can house cards, or it can hold the content directly.</DocNote>
                <ContainerFrame name="Panel" when="A title and a set of related items that belong together. The surface is the group, not one of the items." avoid="Do not use a panel for a single number or a single person. One item that stands on its own is a card. A long list with columns is a table.">
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-11" />
                        <div className="flex flex-col gap-spacing-03">
                            <Pair labelWidth="w-spacing-07" valueWidth="w-spacing-09" />
                            <Pair labelWidth="w-spacing-08" valueWidth="w-spacing-10" />
                            <Pair labelWidth="w-spacing-06" valueWidth="w-spacing-08" />
                        </div>
                    </Card>
                </ContainerFrame>
            </DocSection>
            <DocSection title="Card">
                <DocNote>Use this when the item is the unit. The surface is the card. A panel can still hold several of them.</DocNote>
                <ContainerFrame name="Card" when="One measure, one piece of writing, one person, or one next step. The card is the thing." avoid="Do not stretch one card across a whole group of unrelated items. That group is a panel. Many people of the same kind, with columns to compare, belong in a table.">
                    <Card className="max-w-64 gap-spacing-03">
                        <MetricBones valueWidth="w-spacing-08" trend={rising} />
                    </Card>
                </ContainerFrame>
            </DocSection>
            <DocSection title="Metrics">
                <DocNote>Use this when the page opens with a few numbers. The panel holds the measures. Each measure can be a quiet card inside it.</DocNote>
                <ContainerFrame name="Metrics" when="A few numbers that belong together. Each tile is a label, a number, and a short trend. The panel is the group." avoid="Do not put a chart, a list, and a number in the same tile. A record with a name and a status is a detail, not a metric.">
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
                </ContainerFrame>
            </DocSection>
            <DocSection title="Key-value">
                <DocNote>Use this for facts about one object. The panel holds the pairs. Description list is the control that fills it.</DocNote>
                <ContainerFrame name="Key-value" when="A short set of labels and values for one object. Scan down the panel." avoid="Do not use this for many objects of the same kind. That is a table. Do not put a long paragraph in the value.">
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-09" />
                        <div className="flex flex-col gap-spacing-04">
                            <Pair labelWidth="w-spacing-07" valueWidth="w-spacing-10" />
                            <Pair labelWidth="w-spacing-08" valueWidth="w-spacing-09" />
                            <Pair labelWidth="w-spacing-06" valueWidth="w-spacing-11" />
                            <Pair labelWidth="w-spacing-09" valueWidth="w-spacing-08" />
                        </div>
                    </Card>
                </ContainerFrame>
            </DocSection>
            <DocSection title="Article row">
                <DocNote>Use this for a few pieces of writing. The panel holds the cards in a line.</DocNote>
                <ContainerFrame name="Article row" when="Two or three notes, updates, or posts that sit beside each other. Each card has a picture band and a title." avoid="Do not put a long document in a card. A long document is a page. Many posts belong in a grid.">
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-10" />
                        <div className="flex gap-spacing-04 overflow-x-auto">
                            <ArticleCard />
                            <ArticleCard />
                            <ArticleCard />
                        </div>
                    </Card>
                </ContainerFrame>
            </DocSection>
            <DocSection title="Article grid">
                <DocNote>Use this for many pieces of writing. The panel holds the cards in columns.</DocNote>
                <ContainerFrame name="Article grid" when="A set of notes, updates, or posts that wrap. Each card is one piece of writing." avoid="Do not use a grid for two items. That is a row. People of the same kind, with columns to compare, belong in a table.">
                    <Card>
                        <Bone className="h-spacing-04 w-spacing-10" />
                        <div className="grid gap-spacing-04 sm:grid-cols-2">
                            <ArticleCard />
                            <ArticleCard />
                            <ArticleCard />
                            <ArticleCard />
                        </div>
                    </Card>
                </ContainerFrame>
            </DocSection>
        </DocPage>
    ),
};
