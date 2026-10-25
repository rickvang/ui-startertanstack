import type { TableColumn, TableItem } from "../types";

export const columns: readonly TableColumn[] = [
    { id: "name", header: "Name", kind: "name" },
    { id: "role", header: "Role", kind: "text" },
    { id: "status", header: "Status", kind: "status" },
];

export const members: readonly TableItem[] = [
    { id: "alex", name: "Alex Kim", status: "Active", statusVariant: "success", values: { role: "Owner" } },
    { id: "jordan", name: "Jordan Lee", status: "Review", statusVariant: "warning", values: { role: "Member" } },
    { id: "sam", name: "Sam Patel", status: "Invited", statusVariant: "neutral", values: { role: "Member" } },
];

export const directoryColumns: readonly TableColumn[] = [
    { id: "name", header: "Name", kind: "name" },
    { id: "role", header: "Role", kind: "text" },
    { id: "seats", header: "Seats", kind: "number" },
    { id: "joined", header: "Joined", kind: "date" },
    { id: "profile", header: "Profile", kind: "link" },
    { id: "status", header: "Status", kind: "status" },
    { id: "note", header: "Note", kind: "custom" },
];

export const directory: readonly TableItem[] = [
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

export const roster: readonly TableItem[] = Array.from({ length: 48 }, (_, index) => {
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
