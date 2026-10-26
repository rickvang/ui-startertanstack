import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocDemo, DocList, DocNote, DocPage, DocSection } from "../../../templates/doc";
import { Table } from "../table";
import { directory, directoryColumns } from "./fixtures";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Find: Story = {
    name: "Find",
    render: () => (
        <DocPage title="Find" intro="Search, status filters, and column sort narrow a directory. Each one stays off until the workflow needs it.">
            <DocSection title="Search">
                <DocList
                    items={[
                        { title: "One field", body: "Label it Search. It sits on the same line as the count. The list updates as the person types." },
                        { title: "Every column", body: "Search matches the text on the row, including nested rows. It stays above the columns because it is not tied to one of them." },
                        { title: "Clear search", body: "Clear search empties the field. It leaves the status filters as they are." },
                    ]}
                />
            </DocSection>
            <DocSection title="Filter">
                <DocList
                    items={[
                        { title: "In the Status header", body: "The choices sit in the Status column header, on the same line as the column name." },
                        { title: "Any of the chosen", body: "Press a status to keep it. Press it again to drop it. Several pressed statuses match any of them. Search still has to match." },
                        { title: "Clear filters", body: "Clear filters sits in that header. It drops every status and leaves the search text alone." },
                    ]}
                />
            </DocSection>
            <DocSection title="Sort">
                <DocList
                    items={[
                        { title: "On the name", body: "The column header is the control. The name and the arrow stay on one line." },
                        { title: "One column", body: "The first click sorts ascending, the next descending, then the original order." },
                        { title: "Value", body: "Numbers and dates sort by value. Nested rows stay with their parent. Actions is not a sort column. A new sort returns to the first page." },
                    ]}
                />
            </DocSection>
            <DocSection title="Directory">
                <DocNote>The count reads 2 of 4 records while a search or filter is on. No records match when nothing is left. The table does not fetch. Replace items when the server responds.</DocNote>
                <DocDemo>
                    <Table label="Directory" items={directory} columns={directoryColumns} searchable filterable sortable defaultValue="alex" />
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
