import type { AgentGuidance } from "../../../../../.storybook/addons/agent/types";

export const tableOverviewAgentGuidance = {
    goal: "Show many records of the same kind, one row each. Start with Members; open another story only when the task needs that behavior.",
    when: [
        "The records share the same fields, and the person is looking for one of them.",
        "The person compares a value down a column, such as a status or a date.",
    ],
    avoid: [
        "The row is a summary — use a list.",
        "Each record stands on its own and order does not matter — use cards.",
        "The person is changing the record — use modifying a record; cells stay read-only.",
        "Column resize, reorder, extra pinned columns, and spreadsheet editing wait until a workflow needs them.",
    ],
    cases: [
        { name: "Members", when: "You need the records only: name, fields, status, and selecting a row.", use: "Members story." },
        { name: "Find", when: "You need search, a status filter, sort, or a choice of which columns stay in view.", use: "Find story." },
        { name: "Select and act", when: "You need to choose several records and run an action.", use: "Select and act story." },
        { name: "Expand", when: "You need more about one record, under its row.", use: "Expand story." },
        { name: "States", when: "You need loading, a failed load, an empty list, or a change in row density.", use: "States story." },
        { name: "Wide and sticky", when: "You have many columns, and the header and the name should stay put.", use: "Wide and sticky story." },
        { name: "Long list", when: "You have too many rows to show at once.", use: "Long list story." },
    ],
} as const satisfies AgentGuidance;

export const tableMembersAgentGuidance = {
    goal: "Render a basic selectable member table without extra toolbar power.",
    when: [
        "Pass id, name, status, statusVariant on each item; put other fields in values and links in hrefs. Wire selection with value, defaultValue, and onValueChange.",
    ],
    avoid: ["Do not turn on search, filters, bulk actions, or virtualization until the workflow needs them."],
} as const satisfies AgentGuidance;

export const tableFindAgentGuidance = {
    goal: "Add find tools when the person must search, filter, sort, or choose visible columns.",
    when: ["Search, status filter, sort, or column visibility is part of the task."],
    avoid: ["Do not enable every find control by default on a short fixed list."],
} as const satisfies AgentGuidance;

export const tableSelectAndActAgentGuidance = {
    goal: "Let the person select several rows and run a bulk action.",
    when: ["Multiple records must be chosen, then one shared action runs."],
    avoid: ["Do not stack expand, virtualization, and every toolbar flag on one screen unless the task truly needs it."],
} as const satisfies AgentGuidance;

export const tableExpandAgentGuidance = {
    goal: "Open extra fields under a row without inventing new columns.",
    when: [
        "expandable opens a panel under the row with renderDetail. Use it for extra fields, not new columns. expansion controls how many panels stay open. renderCell handles custom column kinds.",
    ],
    avoid: [
        "Do not edit cells inline or add date, number, or combobox inputs in the table. Changing a record belongs in the modifying-record pattern or a detail view.",
    ],
} as const satisfies AgentGuidance;

export const tableStatesAgentGuidance = {
    goal: "Represent loading, error, empty, and density as explicit table states.",
    when: [
        "loading shows Loader rows. error keeps the header and shows a message. empty is copy when there are no items. A search or filter with no hits uses built-in no matches copy. density changes row padding.",
    ],
    avoid: ["Do not show an empty table with no sentence. Set disabled on an item so it stays visible but cannot be selected."],
} as const satisfies AgentGuidance;

export const tableWideStickyAgentGuidance = {
    goal: "Keep orientation on wide grids with sticky header and a pinned name column.",
    when: ["stickyHeader keeps the header in the scroll frame. stickyColumn pins the name column when many columns scroll sideways. Use both together on wide grids."],
    avoid: ["Do not pin columns that are not the primary identifier."],
} as const satisfies AgentGuidance;

export const tableLongListAgentGuidance = {
    goal: "Handle too many rows with virtualization or paging.",
    when: [
        "virtualize is for long lists with steady row height. pageSize and pageSizeOptions slice parents and compose Pagination when you prefer pages over scrolling.",
    ],
    avoid: ["Do not virtualize short lists or rows whose height changes a lot from expanded panels."],
} as const satisfies AgentGuidance;
