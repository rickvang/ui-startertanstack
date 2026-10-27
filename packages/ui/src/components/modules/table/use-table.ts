import type { KeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDensity } from "../../base/density";
import {
    buildBlocks,
    filterItems,
    flattenRows,
    matchingIds,
    pageCount,
    pageItems,
    sortItems,
    visibleBlocks,
} from "./query";
import { rowHeight, templateFor } from "./table-layout";
import type { FlatRow, SortState, TableColumn, TableProps } from "./types";

function columnStays(column: TableColumn): boolean {
    return column.kind === "name" || column.kind === "actions";
}

export function useTable(props: TableProps) {
    const {
        items,
        columns,
        density,
        value,
        defaultValue,
        onValueChange,
        sortable = false,
        filterable = false,
        columnSettings = false,
        selectable = "single",
        expandable = false,
        expansion = "single",
        rowActions,
        pageSize,
        virtualize = false,
    } = props;

    const resolved = useDensity(density);
    const [uncontrolled, setUncontrolled] = useState(defaultValue ?? items[0]?.id);
    const selected = value ?? uncontrolled;
    const [query, setQuery] = useState("");
    const [statuses, setStatuses] = useState<readonly string[]>([]);
    const [hiddenColumns, setHiddenColumns] = useState<readonly string[]>([]);
    const [sort, setSort] = useState<SortState | null>(null);
    const [checked, setChecked] = useState<readonly string[]>([]);
    const [openIds, setOpenIds] = useState<readonly string[]>([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(pageSize);
    const [scrollTop, setScrollTop] = useState(0);
    const [activeId, setActiveId] = useState(selected);
    const [notice, setNotice] = useState<string | null>(null);
    const rowRefs = useRef<Record<string, HTMLElement | null>>({});
    const moveFocus = useRef(false);
    const multiple = selectable === "multiple";

    const resolvedColumns = columns ?? (sortable || filterable ? [{ id: "name", header: "Name", kind: "name" as const }, { id: "status", header: "Status", kind: "status" as const }] : undefined);
    const withActions: readonly TableColumn[] | undefined =
        rowActions && rowActions.length > 0 && resolvedColumns && !resolvedColumns.some((column) => column.kind === "actions")
            ? [...resolvedColumns, { id: "actions", header: "Actions", kind: "actions" as const }]
            : resolvedColumns;

    const columnChoices = withActions;
    const viewColumns = columnChoices?.filter((column) => columnStays(column) || !hiddenColumns.includes(column.id));
    const filtered = useMemo(() => filterItems(items, viewColumns, query, statuses), [items, viewColumns, query, statuses]);
    const sorted = useMemo(() => sortItems(filtered, viewColumns, sortable ? sort : null), [filtered, viewColumns, sortable, sort]);
    const count = pageCount(sorted.length, size);
    const currentPage = Math.min(page, count);
    const visibleItems = pageItems(sorted, currentPage, size);
    const flat = flattenRows(visibleItems, openIds, expandable);
    const blocks = buildBlocks(flat, openIds, expandable, rowHeight(resolved), 96);
    const windowed = visibleBlocks(blocks, scrollTop, 384, virtualize);
    const statusOptions = [...new Set(items.flatMap((item) => [item.status, ...(item.children ?? []).map((child) => child.status)]))];
    const matchIds = matchingIds(sorted);
    const pageIds = matchingIds(visibleItems);
    const allPageChecked = pageIds.length > 0 && pageIds.every((id) => checked.includes(id));
    const somePageChecked = pageIds.some((id) => checked.includes(id));
    const statusInView = viewColumns?.some((column) => column.kind === "status") ?? false;
    const template = viewColumns ? templateFor(viewColumns, multiple, expandable, filterable && statusInView) : undefined;

    useEffect(() => {
        if (!moveFocus.current || !activeId) {
            return;
        }
        moveFocus.current = false;
        rowRefs.current[activeId]?.focus();
    }, [activeId]);

    function select(id: string) {
        if (value === undefined) {
            setUncontrolled(id);
        }
        setActiveId(id);
        onValueChange?.(id);
    }

    function toggleChecked(id: string) {
        setChecked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    }

    function togglePage() {
        setChecked((current) => {
            if (allPageChecked) {
                return current.filter((id) => !pageIds.includes(id));
            }
            return [...new Set([...current, ...pageIds])];
        });
    }

    function toggleOpen(id: string) {
        setOpenIds((current) => {
            if (current.includes(id)) {
                return current.filter((item) => item !== id);
            }
            return expansion === "single" ? [id] : [...current, id];
        });
    }

    function applyColumns(visibleIds: readonly string[]) {
        if (!columnChoices) {
            return;
        }
        const nextHidden = columnChoices.filter((column) => !columnStays(column) && !visibleIds.includes(column.id)).map((column) => column.id);
        setHiddenColumns(nextHidden);
        setPage(1);
        setSort((current) => (current && nextHidden.includes(current.columnId) ? null : current));
        if (columnChoices.some((column) => column.kind === "status" && nextHidden.includes(column.id))) {
            setStatuses([]);
        }
    }

    function onRowKey(event: KeyboardEvent<HTMLElement>, row: FlatRow) {
        const enabled = flat.filter((item) => !item.item.disabled);
        const index = enabled.findIndex((item) => item.item.id === row.item.id);
        if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
            event.preventDefault();
            const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? enabled.length - 1 : event.key === "ArrowDown" ? Math.min(enabled.length - 1, index + 1) : Math.max(0, index - 1);
            const next = enabled[nextIndex];
            if (next) {
                moveFocus.current = true;
                select(next.item.id);
            }
        }
        if (event.key === "Enter") {
            event.preventDefault();
            select(row.item.id);
        }
        if (event.key === " " && multiple && !row.item.disabled) {
            event.preventDefault();
            toggleChecked(row.item.id);
        }
    }

    return {
        resolved,
        selected,
        activeId,
        query,
        setQuery,
        statuses,
        setStatuses,
        sort,
        setSort,
        checked,
        setChecked,
        openIds,
        page,
        setPage,
        size,
        setSize,
        scrollTop,
        setScrollTop,
        notice,
        setNotice,
        rowRefs,
        multiple,
        withActions: viewColumns,
        columnChoices,
        columnSettings,
        applyColumns,
        sorted,
        count,
        currentPage,
        flat,
        windowed,
        statusOptions,
        matchIds,
        pageIds,
        allPageChecked,
        somePageChecked,
        template,
        select,
        toggleChecked,
        togglePage,
        toggleOpen,
        onRowKey,
    };
}
