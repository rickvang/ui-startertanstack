import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, visualizationPageSnippet } from "../../../.storybook/story-snippets";
import { Select } from "../base/select";
import { Layout } from "../layout/layout";
import { DocDemo, DocList, DocCodeSection, DocPage, DocSection } from "../templates/doc";

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
        <DocPage title="Visualization page" intro="A visualization page helps someone read a set of numbers, see the trend, and decide. The summary comes first. The detail opens only when they ask. It stays its own page until there is a chart module.">
            <DocCodeSection note={compositionNote} code={visualizationPageSnippet} />
            <DocSection title="When to use">
                <DocList
                    items={[
                        { title: "Indicator dashboard", body: "Decision makers need the whole picture, and a way to open one number for more." },
                        { title: "Monitor", body: "One topic, several measures. The page should make an unusual number easy to spot." },
                        { title: "Analysis", body: "The same topic is cut several ways. Filters stay in view while the charts change." },
                        { title: "One report", body: "A single indicator needs its overview and its rows. This is the detail of a chart, not a record detail page." },
                    ]}
                />
            </DocSection>
            <DocSection title="Layout">
                <DocList
                    items={[
                        { title: "Summary, then filters, then detail", body: "The key numbers sit at the top. Filters come next. Charts and tables follow." },
                        { title: "One card, one topic", body: "Related numbers can share a card and be split with a line. A second topic gets its own card." },
                        { title: "Match the reader", body: "A decision maker sees the result. Someone doing the work also gets the filters and the breakdown." },
                    ]}
                />
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
            <DocSection title="Best practice">
                <DocList
                    items={[
                        { title: "Few cards", body: "Keep the page to a handful of cards. More than that hides the point." },
                        { title: "The chart fits the question", body: "A score is a number. A change over time is a chart. A precise set of fields is a table." },
                        { title: "Explain a rollup", body: "When a number is a summary, offer the detail. Do not make the summary the only view." },
                    ]}
                />
            </DocSection>
        </DocPage>
    ),
};
