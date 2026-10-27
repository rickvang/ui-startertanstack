import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocDemo, DocList, DocNote, DocPage, DocSection } from "../../../templates/doc";
import { Table } from "../table";
import { columns, members } from "./fixtures";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
    name: "Overview",
    render: () => (
        <DocPage
            title="Table"
            intro="This page is the map for the table. It shows one record per row, says when a table is the right module, and names the story to open."
        >
            <DocSection title="One row, one record">
                <DocNote>
                    The name identifies the record. The other columns are its fields. Status is its state. A click selects the row. Each record has a name and a status. Put other fields on the columns, links on those fields, and a nested row under its parent. A group names a set of rows. Replace the records when the server responds.
                </DocNote>
                <DocDemo>
                    <Table label="Members" items={members} columns={columns} defaultValue="alex" />
                </DocDemo>
            </DocSection>
            <DocSection title="Open the story for the task">
                <DocList
                    columns={1}
                    items={[
                        { title: "Members", body: "Start here. Name, fields, status, and selecting a row." },
                        { title: "Find", body: "Search, a status filter, sort, and which columns stay in view." },
                        { title: "Select and act", body: "Choose several records, then run an action on them." },
                        { title: "Expand", body: "More about one record, opened under its row." },
                        { title: "States", body: "Loading, a failed load, an empty list, and row density." },
                        { title: "Wide and sticky", body: "Many columns. The header and the name stay put while the rest scrolls." },
                        { title: "Long list", body: "Too many rows to show at once." },
                    ]}
                />
            </DocSection>
            <DocSection title="Use another module">
                <DocList
                    columns={1}
                    items={[
                        { title: "A list", body: "The row is a summary, and a click selects it." },
                        { title: "Cards", body: "Each record stands on its own, and order does not matter." },
                        { title: "Modifying a record", body: "Changing a record happens on its form. The cells stay read-only." },
                        { title: "Later", body: "Column resize, reorder, extra pinned columns, and spreadsheet editing wait until a workflow needs them." },
                    ]}
                />
            </DocSection>
            <DocSection title="Keep the columns lined up">
                <DocList
                    columns={1}
                    items={[
                        { title: "Width", body: "The column kind sets the width. Name, text, date, link, and custom start at the left. Number, status, and actions sit at the end." },
                        { title: "Name edge", body: "The name header, a group label, and a record share one left edge. A nested row is the only indent. A pinned name column keeps that edge." },
                        { title: "Room in front", body: "Checkboxes and expand sit before the columns. A group row includes that room, so the label stays in the name column." },
                        { title: "Menus", body: "Status, Columns, and row actions open beside the control. The grid scrolls sideways, so the menu stays outside the cell." },
                        { title: "Tokens", body: "Space, type, and color use the catalog tokens." },
                    ]}
                />
            </DocSection>
        </DocPage>
    ),
};
