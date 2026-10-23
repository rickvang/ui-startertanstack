import type { FlatRow, SortState, TableBlock, TableColumn, TableColumnKind, TableItem } from "./types";

export function columnText(column: TableColumn, item: TableItem): string {
    switch (column.kind) {
        case "name":
        case "actions":
            return item.name;
        case "status":
            return item.status;
        case "text":
        case "number":
        case "date":
        case "link":
        case "custom":
            return item.values?.[column.id] ?? "";
        default: {
            const exhaustive: never = column.kind;
            return exhaustive;
        }
    }
}

export function itemSearchText(item: TableItem, columns: readonly TableColumn[] | undefined): string {
    const parts = [item.name, item.status, ...Object.values(item.values ?? {})];
    if (columns) {
        parts.push(...columns.map((column) => columnText(column, item)));
    }
    return parts.join(" ").toLowerCase();
}

function matchesQuery(item: TableItem, columns: readonly TableColumn[] | undefined, query: string): boolean {
    if (query.length === 0) {
        return true;
    }
    if (itemSearchText(item, columns).includes(query)) {
        return true;
    }
    return item.children?.some((child) => matchesQuery(child, columns, query)) ?? false;
}

function sortValue(kind: TableColumnKind, columnId: string, item: TableItem): string | number {
    switch (kind) {
        case "name":
        case "actions":
            return item.name.toLowerCase();
        case "status":
            return item.status.toLowerCase();
        case "number":
            return Number((item.values?.[columnId] ?? "").replace(/[^0-9.-]/g, "")) || 0;
        case "date":
            return Date.parse(item.values?.[columnId] ?? "") || 0;
        case "text":
        case "link":
        case "custom":
            return (item.values?.[columnId] ?? "").toLowerCase();
        default: {
            const exhaustive: never = kind;
            return exhaustive;
        }
    }
}

export function filterItems(items: readonly TableItem[], columns: readonly TableColumn[] | undefined, query: string, statuses: readonly string[]): TableItem[] {
    const needle = query.trim().toLowerCase();
    return items.flatMap((item) => {
        if (!matchesQuery(item, columns, needle)) {
            return [];
        }
        if (statuses.length > 0 && !statuses.includes(item.status) && !item.children?.some((child) => statuses.includes(child.status))) {
            return [];
        }
        const parentMatchesStatus = statuses.length === 0 || statuses.includes(item.status);
        const parentMatchesQuery = needle.length === 0 || itemSearchText(item, columns).includes(needle);
        const children = item.children?.filter((child) => {
            const statusOk = statuses.length === 0 || statuses.includes(child.status) || parentMatchesStatus;
            const queryOk = needle.length === 0 || parentMatchesQuery || itemSearchText(child, columns).includes(needle);
            return statusOk && queryOk;
        });
        return [{ ...item, children }];
    });
}

export function sortItems(items: readonly TableItem[], columns: readonly TableColumn[] | undefined, sort: SortState | null): TableItem[] {
    if (!sort) {
        return [...items];
    }
    const column = columns?.find((item) => item.id === sort.columnId);
    const kind = column?.kind ?? (sort.columnId === "status" ? "status" : "name");
    const direction = sort.direction === "asc" ? 1 : -1;
    return [...items].sort((left, right) => {
        const a = sortValue(kind, sort.columnId, left);
        const b = sortValue(kind, sort.columnId, right);
        if (a < b) {
            return -1 * direction;
        }
        if (a > b) {
            return 1 * direction;
        }
        return 0;
    });
}

export function pageItems(items: readonly TableItem[], page: number, pageSize: number | undefined): TableItem[] {
    if (!pageSize) {
        return [...items];
    }
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
}

export function pageCount(count: number, pageSize: number | undefined): number {
    if (!pageSize) {
        return 1;
    }
    return Math.max(1, Math.ceil(count / pageSize));
}

export function flattenRows(items: readonly TableItem[], expanded: readonly string[], expandable: boolean): FlatRow[] {
    const open = new Set(expanded);
    const rows: FlatRow[] = [];
    for (const item of items) {
        rows.push({ item, depth: 0 });
        const showChildren = item.children && item.children.length > 0 && (!expandable || open.has(item.id));
        if (showChildren && item.children) {
            for (const child of item.children) {
                rows.push({ item: child, depth: 1 });
            }
        }
    }
    return rows;
}

export function buildBlocks(rows: readonly FlatRow[], expanded: readonly string[], expandable: boolean, rowHeight: number, detailHeight: number): TableBlock[] {
    const open = new Set(expanded);
    const blocks: TableBlock[] = [];
    let lastGroup = "";
    for (const row of rows) {
        if (row.depth === 0 && row.item.group && row.item.group !== lastGroup) {
            blocks.push({ kind: "group", key: `group-${row.item.group}-${row.item.id}`, label: row.item.group, height: 28 });
            lastGroup = row.item.group;
        }
        if (row.depth === 0 && !row.item.group) {
            lastGroup = "";
        }
        blocks.push({ kind: "row", key: row.item.id, row, height: rowHeight });
        if (expandable && open.has(row.item.id) && row.depth === 0) {
            blocks.push({ kind: "detail", key: `${row.item.id}-detail`, row, height: detailHeight });
        }
    }
    return blocks;
}

export function visibleBlocks(blocks: readonly TableBlock[], scrollTop: number, viewport: number, virtualize: boolean): { blocks: TableBlock[]; offset: number; total: number } {
    const total = blocks.reduce((sum, block) => sum + block.height, 0);
    if (!virtualize) {
        return { blocks: [...blocks], offset: 0, total };
    }
    let offset = 0;
    let start = 0;
    for (let index = 0; index < blocks.length; index += 1) {
        const block = blocks[index];
        if (!block) {
            break;
        }
        if (offset + block.height >= Math.max(0, scrollTop - 80)) {
            start = index;
            break;
        }
        offset += block.height;
    }
    let end = start;
    let seen = 0;
    while (end < blocks.length && seen < viewport + 160) {
        seen += blocks[end]?.height ?? 0;
        end += 1;
    }
    return { blocks: blocks.slice(start, end), offset, total };
}

export function matchingIds(items: readonly TableItem[]): string[] {
    const ids: string[] = [];
    for (const item of items) {
        if (!item.disabled) {
            ids.push(item.id);
        }
        for (const child of item.children ?? []) {
            if (!child.disabled) {
                ids.push(child.id);
            }
        }
    }
    return ids;
}

export function nextSort(current: SortState | null, columnId: string): SortState | null {
    if (!current || current.columnId !== columnId) {
        return { columnId, direction: "asc" };
    }
    if (current.direction === "asc") {
        return { columnId, direction: "desc" };
    }
    return null;
}
