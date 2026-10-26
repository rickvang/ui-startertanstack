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
                        { title: "An icon in the header", body: "The Status header keeps the column name. A filter icon opens the choices. The column stays the width of the status." },
                        { title: "The menu", body: "Check the statuses to keep. Several checks match any of them. OK applies them. Reset clears the checks. Search still has to match." },
                        { title: "The icon", body: "The icon fills when a filter is on. Closing the menu without OK leaves the table as it was." },
                    ]}
                />
            </DocSection>
            <DocSection title="Sort">
                <DocList
                    items={[
                        { title: "Beside the name", body: "The column name is the control. A mark sits beside the name only while that column is sorted." },
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
