import type { ReactNode } from "react";
import type { Density } from "../../base/density";

export type StatusVariant = "neutral" | "success" | "warning" | "danger";

export type TableColumnKind = "name" | "text" | "status" | "number" | "date" | "link" | "actions" | "custom";

export type TableColumn = {
    id: string;
    header: string;
    kind: TableColumnKind;
};

export type TableAction = {
    id: string;
    label: string;
};

export type TableItem = {
    id: string;
    name: string;
    status: string;
    statusVariant: StatusVariant;
    values?: Readonly<Record<string, string>>;
    hrefs?: Readonly<Record<string, string>>;
    disabled?: boolean;
    group?: string;
    children?: readonly TableItem[];
};

export type SortState = {
    columnId: string;
    direction: "asc" | "desc";
};

export type FlatRow = {
    item: TableItem;
    depth: number;
};

export type TableBlock =
    | { kind: "group"; key: string; label: string; height: number }
    | { kind: "row"; key: string; row: FlatRow; height: number }
    | { kind: "detail"; key: string; row: FlatRow; height: number };

export type TableProps = {
    label: string;
    items: readonly TableItem[];
    columns?: readonly TableColumn[];
    density?: Density;
    value?: string;
    defaultValue?: string;
    onValueChange?: (id: string) => void;
    searchable?: boolean;
    filterable?: boolean;
    sortable?: boolean;
    columnSettings?: boolean;
    selectable?: "single" | "multiple";
    expandable?: boolean;
    expansion?: "single" | "multiple";
    renderDetail?: (item: TableItem) => ReactNode;
    renderCell?: (column: TableColumn, item: TableItem) => ReactNode;
    rowActions?: readonly TableAction[];
    onRowAction?: (actionId: string, item: TableItem) => void;
    bulkActions?: readonly TableAction[];
    onBulkAction?: (actionId: string, ids: readonly string[]) => void;
    loading?: boolean;
    error?: string;
    empty?: string;
    pageSize?: number;
    pageSizeOptions?: readonly number[];
    stickyHeader?: boolean;
    stickyColumn?: boolean;
    virtualize?: boolean;
};
