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
                        { title: "Outside this table", body: "Editing a record stays the modifying-record pattern. Column resize, reorder, pinned ranges, and spreadsheet editing wait until a workflow needs them." },
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
            <DocSection title="Layout">
                <DocList
                    columns={1}
                    items={[
                        { title: "One grid", body: "Column width comes from kind in the layout module. Name, text, date, link, and custom start at the left. Number, status, and actions sit at the end. Padding on one cell does not move a column." },
                        { title: "Name edge", body: "The Name header, a group label, and a record share one left edge. A nested row is the only indent in that column. A pinned name column keeps that same edge." },
                        { title: "Leading tracks", body: "Checkboxes and expand sit before the columns. A group row includes those tracks, so the label stays in Name." },
                        { title: "Menus", body: "Status, Columns, and row actions open from the anchored menu. The grid scrolls sideways, so a menu placed inside a cell is clipped." },
                        { title: "Tokens", body: "Space, type, and color use the semantic tokens. The table has no stylesheet of its own." },
                    ]}
                />
            </DocSection>
            <DocSection title="Flags and behavior">
                <DocList
                    items={[
                        { title: "Selection", body: "Row click selects the record (value, defaultValue, onValueChange). selectable=\"multiple\" adds checkboxes and a bulk bar." },
                        { title: "Finding", body: "searchable, filterable, sortable, and columnSettings are opt-in. Search sits with the count. Status opens from an icon in that header. Sort is a mark beside the column name. Columns chooses which fields are in view." },
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
                        { title: "Find", body: "Search in the toolbar, a status menu, a sort mark, and a Columns control for the view." },
                        { title: "Select and act", body: "Multi-select, pagination, row actions, bulk actions, and the Columns menu." },
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
