import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../base/badge";
import { DocList, DocPage, DocSection } from "../templates/doc";
import { Table as MemberTable, type TableColumn, type TableItem } from "./table";

const columns: readonly TableColumn[] = [
    { id: "name", header: "Name", kind: "name" },
    { id: "role", header: "Role", kind: "text" },
    { id: "status", header: "Status", kind: "status" },
];

const members: readonly TableItem[] = [
    { id: "alex", name: "Alex Kim", status: "Active", statusVariant: "success", values: { role: "Owner" } },
    { id: "jordan", name: "Jordan Lee", status: "Review", statusVariant: "warning", values: { role: "Member" } },
    { id: "sam", name: "Sam Patel", status: "Invited", statusVariant: "neutral", values: { role: "Member" } },
];

const directoryColumns: readonly TableColumn[] = [
    { id: "name", header: "Name", kind: "name" },
    { id: "role", header: "Role", kind: "text" },
    { id: "seats", header: "Seats", kind: "number" },
    { id: "joined", header: "Joined", kind: "date" },
    { id: "profile", header: "Profile", kind: "link" },
    { id: "status", header: "Status", kind: "status" },
    { id: "note", header: "Note", kind: "custom" },
];

const directory: readonly TableItem[] = [
    {
        id: "alex",
        name: "Alex Kim",
        status: "Active",
        statusVariant: "success",
        group: "Owners",
        values: { role: "Owner", seats: "12", joined: "2024-01-12", profile: "alex.example", note: "Billing owner" },
        hrefs: { profile: "https://example.com/alex" },
        children: [
            { id: "alex-billing", name: "Billing access", status: "Active", statusVariant: "success", values: { role: "Owner", seats: "1", joined: "2024-02-02", profile: "billing.example", note: "Child record" } },
        ],
    },
    {
        id: "jordan",
        name: "Jordan Lee",
        status: "Review",
        statusVariant: "warning",
        group: "Members",
        values: { role: "Member with a very long role name that should truncate", seats: "3", joined: "2024-06-03", profile: "jordan.example", note: "Waiting on review" },
        hrefs: { profile: "https://example.com/jordan" },
    },
    {
        id: "sam",
        name: "Sam Patel",
        status: "Invited",
        statusVariant: "neutral",
        disabled: true,
        group: "Members",
        values: { role: "Member", seats: "0", joined: "2025-01-09", profile: "sam.example", note: "Invite expired" },
        hrefs: { profile: "https://example.com/sam" },
    },
    {
        id: "riley",
        name: "Riley Chen",
        status: "Active",
        statusVariant: "success",
        group: "Members",
        values: { role: "Member", seats: "8", joined: "2023-11-18", profile: "riley.example", note: "Studio lead" },
        hrefs: { profile: "https://example.com/riley" },
    },
];

const roster: readonly TableItem[] = Array.from({ length: 48 }, (_, index) => {
    const status = index % 3 === 0 ? "Active" : index % 3 === 1 ? "Review" : "Invited";
    const statusVariant = status === "Active" ? "success" : status === "Review" ? "warning" : "neutral";
    return {
        id: `person-${index + 1}`,
        name: `Person ${index + 1}`,
        status,
        statusVariant,
        values: { role: "Member", seats: String(index + 1), joined: "2024-03-01", profile: `person-${index + 1}.example`, note: "Roster" },
    } satisfies TableItem;
});

const meta = {
    title: "Modules/Table",
    component: MemberTable,
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MemberTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Table: Story = {
    name: "Table",
    args: { label: "Members", items: members },
    render: () => (
        <DocPage title="Table" intro="A table is many entries of the same kind. Search, sort, and filters run on those entries. Selecting a row marks the record. Extra fields open in the row, and they do not become new columns.">
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
            <DocSection title="Members">
                <MemberTable label="Members" items={members} columns={columns} defaultValue="alex" />
            </DocSection>
            <DocSection title="Find">
                <MemberTable label="Directory" items={directory} columns={directoryColumns} searchable filterable sortable defaultValue="alex" />
            </DocSection>
            <DocSection title="Select and act">
                <MemberTable
                    label="Directory selection"
                    items={directory}
                    columns={directoryColumns}
                    selectable="multiple"
                    pageSize={2}
                    pageSizeOptions={[2, 4]}
                    rowActions={[{ id: "open", label: "Open" }, { id: "copy", label: "Copy link" }]}
                    bulkActions={[{ id: "export", label: "Export" }]}
                    defaultValue="alex"
                />
            </DocSection>
            <DocSection title="Expand">
                <MemberTable
                    label="Directory detail"
                    items={directory}
                    columns={columns}
                    expandable
                    expansion="multiple"
                    renderDetail={(item) => <p>{item.values?.note ?? item.name}</p>}
                    renderCell={(column, item) => column.id === "note" ? <Badge>{item.values?.note}</Badge> : item.values?.[column.id]}
                    defaultValue="alex"
                />
            </DocSection>
            <DocSection title="States">
                <div className="flex flex-col gap-spacing-06">
                    <MemberTable label="Loading members" items={[]} columns={columns} loading />
                    <MemberTable label="Missing members" items={[]} columns={columns} error="Members could not be loaded." />
                    <MemberTable label="Empty members" items={[]} columns={columns} empty="No members yet" />
                    <MemberTable label="Dense members" items={members} columns={columns} density="dense" defaultValue="alex" />
                    <MemberTable label="Wide members" items={members} columns={columns} density="wide" defaultValue="alex" />
                </div>
            </DocSection>
            <DocSection title="Wide and sticky">
                <MemberTable label="Wide directory" items={directory} columns={directoryColumns} stickyHeader sortable defaultValue="alex" />
            </DocSection>
            <DocSection title="Long list">
                <MemberTable label="Roster" items={roster} columns={columns} searchable sortable virtualize stickyHeader defaultValue="person-1" />
            </DocSection>
        </DocPage>
    ),
};
