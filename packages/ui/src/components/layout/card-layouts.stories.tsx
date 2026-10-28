import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { cx } from "../../utils/cx";
import { DocDemo, DocList, DocNote, DocPage, DocSection, DocWhenAvoid } from "../templates/doc";
import { Card } from "./card";

function Bone({ className }: { className: string }) {
    return <span className={cx("block rounded-sm bg-line", className)} />;
}

function CardLayout({ name, when, avoid, children }: { name: string; when: string; avoid: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-spacing-05">
            <DocWhenAvoid when={when} avoid={avoid} />
            <DocDemo bleed>
                <div className="bg-canvas p-spacing-05">{children}</div>
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

function MetricCard({ valueWidth, trend }: { valueWidth: string; trend: readonly string[] }) {
    return (
        <Card className="gap-spacing-03 p-spacing-04">
            <Bone className="h-spacing-03 w-spacing-07" />
            <div className="flex items-end gap-spacing-04">
                <Bone className={cx("h-spacing-07", valueWidth)} />
                <Trend heights={trend} />
            </div>
            <Bone className="h-spacing-04 w-spacing-09" />
        </Card>
    );
}

const rising = ["h-spacing-02", "h-spacing-03", "h-spacing-02", "h-spacing-04", "h-spacing-03", "h-spacing-05", "h-spacing-04"] as const;
const falling = ["h-spacing-05", "h-spacing-04", "h-spacing-04", "h-spacing-03", "h-spacing-03", "h-spacing-02", "h-spacing-02"] as const;

const meta = {
    title: "Layout/Card",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardLayouts: Story = {
    name: "Card",
    render: () => (
        <DocPage title="Card layouts" intro="A card layout decides what sits inside the surface. Pick it from the job. The surface, and its outlined, raised, and quiet treatments, are in Components / Card.">
            <DocSection title="How to choose">
                <DocList
                    items={[
                        { title: "One measure", body: "Metric. A label, a number, a short trend, and a comparison. Several measures sit in a row." },
                        { title: "One piece of writing", body: "Article. A picture band, a title, a short line, and who wrote it." },
                        { title: "One person", body: "Person. A face, a name, a role, and a status." },
                        { title: "One action", body: "Next step. A title, one line, and a single action. The quieter surface keeps it from competing." },
                    ]}
                />
            </DocSection>
            <DocSection title="Metric">
                <DocNote>Use this when the page opens with a few numbers. Each card is one measure.</DocNote>
                <CardLayout name="Metric" when="A label, a number, a short trend, and the period it is compared with. Show the measures in a row so they can be scanned together." avoid="Do not put a chart, a list, and a number in the same card. A record with a name and a status is a detail, not a metric.">
                    <div className="grid gap-spacing-04 md:grid-cols-3">
                        <MetricCard valueWidth="w-spacing-08" trend={rising} />
                        <MetricCard valueWidth="w-spacing-06" trend={falling} />
                        <MetricCard valueWidth="w-spacing-07" trend={rising} />
                    </div>
                </CardLayout>
            </DocSection>
            <DocSection title="Article">
                <DocNote>Use this for a note, an update, or a short post. The picture band is the first thing.</DocNote>
                <CardLayout name="Article" when="A picture band, a title, one or two lines, and who wrote it. The band runs to the edges of the card." avoid="Do not use this for a number or a person. A long document is a page.">
                    <Card className="max-w-xl overflow-hidden p-0">
                        <Bone className="h-spacing-11 w-full rounded-none" />
                        <div className="flex flex-col gap-spacing-03 p-spacing-05">
                            <Bone className="h-spacing-04 w-spacing-06" />
                            <Bone className="h-spacing-04 w-spacing-12" />
                            <Bone className="h-spacing-03 w-full" />
                            <Bone className="h-spacing-03 w-spacing-09" />
                        </div>
                    </Card>
                </CardLayout>
            </DocSection>
            <DocSection title="Person">
                <DocNote>Use this for one person in a grid of people. The status sits at the end of the row.</DocNote>
                <CardLayout name="Person" when="A face, a name, a role, and a status. The face is a circle. The status is the quiet mark at the end." avoid="Many people of the same kind, with columns to compare, belong in a table.">
                    <Card className="max-w-xl">
                        <div className="flex items-center gap-spacing-03">
                            <Bone className="size-spacing-07 rounded-full" />
                            <div className="flex min-w-0 flex-col gap-spacing-02">
                                <Bone className="h-spacing-04 w-spacing-09" />
                                <Bone className="h-spacing-03 w-spacing-07" />
                            </div>
                            <Bone className="ml-auto h-spacing-04 w-spacing-07" />
                        </div>
                    </Card>
                </CardLayout>
            </DocSection>
            <DocSection title="Next step">
                <DocNote>Use this for one thing the person can do from here. It stays quieter than the numbers beside it.</DocNote>
                <CardLayout name="Next step" when="A title, one line, and one action. The quieter fill keeps the action from competing with the measures." avoid="Do not stack several actions on the card. A question the person must answer before they continue is a modal.">
                    <Card variant="quiet" className="max-w-xl">
                        <Bone className="h-spacing-04 w-spacing-11" />
                        <Bone className="h-spacing-03 w-4/5" />
                        <Bone className="h-spacing-07 w-spacing-09 rounded-md bg-neutral-500" />
                    </Card>
                </CardLayout>
            </DocSection>
        </DocPage>
    ),
};
