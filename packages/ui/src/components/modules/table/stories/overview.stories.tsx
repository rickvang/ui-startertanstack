import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, membersTableSnippet } from "../../../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocRows, DocSection } from "../../../templates/doc";
import { Table } from "../table";
import { columns, members } from "./fixtures";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
    name: "Overview",
    render: () => (
        <DocPage title="Table" intro="A table shows many records of the same kind, one row each.">
            <DocSection title="Example">
                <DocParagraph>The name identifies the record. The other columns are its fields. Status is its state. A click selects the row.</DocParagraph>
                <DocDemo>
                    <Table label="Members" items={members} columns={columns} defaultValue="alex" />
                </DocDemo>
                <DocParagraph>
                    Each record has a name and a status. Put other fields on the columns, and links on those fields. A group names a set of rows. A nested row belongs to its parent. Replace the records when the server responds.
                </DocParagraph>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets
                    items={[
                        "The records share the same fields, and the person is looking for one of them.",
                        "The person compares a value down a column, such as a status or a date.",
                    ]}
                />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "The row is a summary. Use a list.",
                        "Each record stands on its own, and order does not matter. Use cards.",
                        "The person is changing the record. Use modifying a record. The cells stay read-only.",
                        "Column resize, reorder, extra pinned columns, and spreadsheet editing wait until a workflow needs them.",
                    ]}
                />
            </DocSection>
            <DocSection title="Stories">
                <DocParagraph>Start with Members. Open another story when the task needs that behavior.</DocParagraph>
                <DocRows
                    headers={["Story", "Use it when"]}
                    rows={[
                        { label: "Members", detail: "You need the records only: name, fields, status, and selecting a row." },
                        { label: "Find", detail: "You need search, a status filter, sort, or a choice of which columns stay in view." },
                        { label: "Select and act", detail: "You need to choose several records and run an action." },
                        { label: "Expand", detail: "You need more about one record, under its row." },
                        { label: "States", detail: "You need loading, a failed load, an empty list, or a change in row density." },
                        { label: "Wide and sticky", detail: "You have many columns, and the header and the name should stay put." },
                        { label: "Long list", detail: "You have too many rows to show at once." },
                    ]}
                />
            </DocSection>
            <DocSection title="Columns">
                <DocParagraph>Every row uses the same columns, so the values line up.</DocParagraph>
                <DocBullets
                    items={[
                        "The column kind sets the width. Name, text, date, link, and custom start at the left. Number, status, and actions sit at the end.",
                        "The name header, a group label, and a record share one left edge. A nested row is the only indent. A pinned name column keeps that edge.",
                        "Checkboxes and expand sit before the columns. A group row includes that room, so the label stays in the name column.",
                        "Status, Columns, and row actions open a Popover beside the control. The grid scrolls sideways, so the menu stays outside the cell.",
                        "A confirm that must stop the page uses Dialog. A full-height task on one row uses Drawer. Do not nest overlays.",
                        "Space, type, and color use the catalog tokens.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={membersTableSnippet} />
        </DocPage>
    ),
};
