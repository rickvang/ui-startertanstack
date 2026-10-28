import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, visualizationPageSnippet } from "../../../.storybook/story-snippets";
import { Select } from "../base/select";
import { Layout } from "../layout/layout";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";

const week = [
    { label: "Mon", height: "h-spacing-07" },
    { label: "Tue", height: "h-spacing-09" },
    { label: "Wed", height: "h-spacing-11" },
    { label: "Thu", height: "h-spacing-08" },
    { label: "Fri", height: "h-spacing-10" },
] as const;

const meta = {
    title: "Patterns/Visualization page",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const VisualizationPage: Story = {
    name: "Visualization page",
    render: () => (
        <DocPage title="Visualization page" intro="Read a set of numbers, see the trend, and decide. Summary first. Detail only when asked.">
            <DocSection title="Example">
                <DocParagraph>Key numbers sit at the top. Filters come next. The chart follows. This stays its own page until there is a chart module.</DocParagraph>
                <DocDemo bleed>
                    <Layout header={<span className="font-semibold text-ink">Members</span>}>
                        <div className="flex flex-col gap-spacing-04">
                            <div className="grid grid-cols-3 gap-spacing-03">
                                <div className="rounded-lg border border-line bg-surface p-spacing-04">
                                    <p className="text-xs text-muted">Active</p>
                                    <p className="text-lg font-semibold text-ink">24</p>
                                </div>
                                <div className="rounded-lg border border-line bg-surface p-spacing-04">
                                    <p className="text-xs text-muted">In review</p>
                                    <p className="text-lg font-semibold text-ink">3</p>
                                </div>
                                <div className="rounded-lg border border-line bg-surface p-spacing-04">
                                    <p className="text-xs text-muted">Invited</p>
                                    <p className="text-lg font-semibold text-ink">8</p>
                                </div>
                            </div>
                            <Select label="Range" defaultValue="week" options={[{ value: "week", label: "This week" }, { value: "month", label: "This month" }]} />
                            <div className="rounded-lg border border-line bg-surface p-spacing-04">
                                <div className="flex h-spacing-11 items-end gap-spacing-03">
                                    {week.map((day) => (
                                        <div key={day.label} className="flex flex-col items-center gap-spacing-02">
                                            <div className={`w-spacing-07 bg-accent ${day.height}`} />
                                            <span className="text-xs text-muted">{day.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Layout>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets
                    items={[
                        "Decision makers need the whole picture, and a way to open one number for more.",
                        "One topic, several measures. An unusual number should be easy to spot.",
                        "The same topic is cut several ways. Filters stay in view while the charts change.",
                        "A single indicator needs its overview and its rows. That is a chart detail, not a record detail.",
                    ]}
                />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A list of records. Use a table.",
                        "One object's facts. Use a detail.",
                    ]}
                />
            </DocSection>
            <DocSection title="Layout">
                <DocBullets
                    items={[
                        "Summary, then filters, then detail. Key numbers sit at the top. Charts and tables follow.",
                        "One card, one topic. Related numbers can share a card. A second topic gets its own.",
                        "Match the reader. A decision maker sees the result. Someone doing the work also gets the filters and the breakdown.",
                    ]}
                />
            </DocSection>
            <DocSection title="Best practice">
                <DocBullets
                    items={[
                        "Keep the page to a handful of cards. More than that hides the point.",
                        "A score is a number. A change over time is a chart. A precise set of fields is a table.",
                        "When a number is a summary, offer the detail. Do not make the summary the only view.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={compositionNote} code={visualizationPageSnippet} />
        </DocPage>
    ),
};
