import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocList, DocPage, DocSection } from "../../../templates/doc";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
    name: "Overview",
    render: () => (
        <DocPage
            title="Table"
            intro="A table is many entries of the same kind. Search, sort, and filters run on those entries. Selecting a row marks the record. Extra fields open in the row, and they do not become new columns."
        >
            <DocSection title="When to use">
                <DocList
                    items={[
                        { title: "Table", body: "Each entry shows many fields, and the person already knows what they are looking for." },
                        { title: "Standard list", body: "A row is a summary. A click selects the entry. A count can sit above the list." },
                        { title: "Cards", body: "Order does not matter, and each entry should be seen as its own object. Cards stay a separate module." },
                        { title: "Outside this table", body: "Editing a record stays the modifying-record pattern. Column resize, reorder, hide, pinned ranges, and spreadsheet editing wait until a workflow needs them." },
                    ]}
                />
            </DocSection>
            <DocSection title="Data and columns">
                <DocList
                    columns={1}
                    items={[
                        { title: "Items", body: "Pass id, name, status, and statusVariant on each item. Put other fields in values. Links go in hrefs. Nest related rows in children. Use group for a spanning section label." },
                        { title: "Columns", body: "Omit columns for a simple list (name and status only). With columns, set kind to name, text, status, number, date, link, custom, or actions. Map values[column.id] for text-like kinds." },
                        { title: "Remote data", body: "The table does not fetch. Replace items when the server responds. Search, sort, filter, and page run on whatever items you pass unless you pre-process them yourself." },
                    ]}
                />
            </DocSection>
            <DocSection title="Flags and behavior">
                <DocList
                    items={[
                        { title: "Selection", body: "Row click selects the record (value, defaultValue, onValueChange). selectable=\"multiple\" adds checkboxes and a bulk bar." },
                        { title: "Finding", body: "searchable, filterable, and sortable are opt-in. Turn them on when the workflow needs them, not by default." },
                        { title: "Detail", body: "expandable opens a panel under the row via renderDetail. Use it for extra fields, not new columns." },
                        { title: "Scale", body: "pageSize, stickyHeader, stickyColumn, and virtualize address long or wide lists. Prefer pagination or virtualization for large sets, not both with every other flag." },
                        { title: "States", body: "loading, error, and empty are explicit. Filtered empty uses built-in no matches copy. disabled keeps a row visible but not selectable." },
                    ]}
                />
            </DocSection>
            <DocSection title="Examples in this module">
                <DocList
                    items={[
                        { title: "Members", body: "Baseline grid: label, items, columns, and row selection only." },
                        { title: "Find", body: "Search, status filters, and column sort on a wide directory." },
                        { title: "Select and act", body: "Multi-select, pagination, row actions, and bulk actions." },
                        { title: "Expand", body: "Row detail panels and custom column rendering." },
                        { title: "States", body: "Loading, error, empty, and density." },
                        { title: "Wide and sticky", body: "Horizontal scroll with sticky header and name column." },
                        { title: "Long list", body: "Virtualized scroll with search and sort." },
                    ]}
                />
            </DocSection>
            <DocSection title="Do and avoid">
                <DocList
                    columns={1}
                    items={[
                        { title: "Keep the simple case simple", body: "Start with Members. Add flags when the task needs them." },
                        { title: "Stop propagation on controls", body: "Checkboxes, expand, links, and row actions already stop propagation so row click stays predictable." },
                        { title: "Do not edit cells inline", body: "Changing a record belongs in modifying a record or a detail view." },
                        { title: "Do not use the table as cards", body: "When each object should stand alone and order is weak, use cards instead." },
                        { title: "Do not virtualize small lists", body: "virtualize assumes steady row height. Skip it for short lists or heavy expand panels." },
                    ]}
                />
            </DocSection>
        </DocPage>
    ),
};
