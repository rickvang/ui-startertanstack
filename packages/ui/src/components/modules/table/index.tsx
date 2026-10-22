import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Badge } from "../../base/badge";
import { Button } from "../../base/button";
import { type Density, useDensity } from "../../base/density";
import { Loader } from "../../base/loader";
import { Select } from "../../base/select";
import { TextField } from "../../base/text-field";
import { Pagination } from "../../navigation/pagination";
import { cx } from "../../../utils/cx";
import {
    type FlatRow,
    type SortState,
    type TableAction,
    type TableBlock,
    type TableColumn,
    type TableItem,
    buildBlocks,
    columnText,
    filterItems,
    flattenRows,
    matchingIds,
    nextSort,
    pageCount,
    pageItems,
    sortItems,
    visibleBlocks,
} from "./query";

export type { TableAction, TableColumn, TableColumnKind, TableItem } from "./query";

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
    virtualize?: boolean;
};

const rowPad: Record<Density, string> = {
    dense: "gap-spacing-03 px-spacing-03 py-spacing-01",
    standard: "gap-spacing-03 px-spacing-04 py-spacing-02",
    wide: "gap-spacing-04 px-spacing-05 py-spacing-03",
};

const cellText: Record<Density, string> = {
    dense: "text-xs",
    standard: "text-sm",
    wide: "text-sm",
};

function rowHeight(density: Density): number {
    switch (density) {
        case "dense":
            return 32;
        case "standard":
            return 40;
        case "wide":
            return 48;
        default: {
            const exhaustive: never = density;
            return exhaustive;
        }
    }
}

function templateFor(columns: readonly TableColumn[], multiple: boolean, expandable: boolean): string {
    const tracks = columns.map((column) => {
        switch (column.kind) {
            case "name":
            case "custom":
                return "minmax(0,1.4fr)";
            case "text":
            case "link":
                return "minmax(0,1fr)";
            case "number":
            case "date":
            case "status":
            case "actions":
                return "auto";
            default: {
                const exhaustive: never = column.kind;
                return exhaustive;
            }
        }
    });
    return [multiple ? "auto" : null, expandable ? "auto" : null, ...tracks].filter((track) => track !== null).join(" ");
}

function alignClass(column: TableColumn): string | undefined {
    switch (column.kind) {
        case "number":
        case "status":
        case "actions":
            return "justify-self-end text-right";
        case "name":
        case "text":
        case "date":
        case "link":
        case "custom":
            return undefined;
        default: {
            const exhaustive: never = column.kind;
            return exhaustive;
        }
    }
}

function Check({ label, checked, indeterminate, disabled, onChange }: { label: string; checked: boolean; indeterminate?: boolean; disabled?: boolean; onChange: () => void }) {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = indeterminate ?? false;
        }
    }, [indeterminate]);

    return (
        <input
            ref={ref}
            type="checkbox"
            aria-label={label}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            onClick={(event) => event.stopPropagation()}
            className="size-spacing-04 accent-accent disabled:opacity-50"
        />
    );
}

function RowMenu({ label, actions, onSelect }: { label: string; actions: readonly TableAction[]; onSelect: (id: string) => void }) {
    const [open, setOpen] = useState(false);
    const menuId = useId();

    return (
        <div className="relative justify-self-end">
            <Button variant="ghost" size="dense" aria-expanded={open} aria-controls={menuId} onClick={(event) => { event.stopPropagation(); setOpen((value) => !value); }}>
                {label}
            </Button>
            {open ? (
                <div id={menuId} role="menu" className="absolute right-0 z-20 mt-spacing-02 flex min-w-spacing-12 flex-col rounded-md border border-line bg-surface p-spacing-02">
                    {actions.map((action) => (
                        <button
                            key={action.id}
                            type="button"
                            role="menuitem"
                            className="rounded-md px-spacing-03 py-spacing-02 text-left text-sm text-ink hover:bg-canvas"
                            onClick={(event) => {
                                event.stopPropagation();
                                setOpen(false);
                                onSelect(action.id);
                            }}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export function Table({
    label,
    items,
    columns,
    density,
    value,
    defaultValue,
    onValueChange,
    searchable = false,
    filterable = false,
    sortable = false,
    selectable = "single",
    expandable = false,
    expansion = "single",
    renderDetail,
    renderCell,
    rowActions,
    onRowAction,
    bulkActions,
    onBulkAction,
    loading = false,
    error,
    empty = "No records",
    pageSize,
    pageSizeOptions,
    stickyHeader = false,
    virtualize = false,
}: TableProps) {
    const resolved = useDensity(density);
    const [uncontrolled, setUncontrolled] = useState(defaultValue ?? items[0]?.id);
    const selected = value ?? uncontrolled;
    const [query, setQuery] = useState("");
    const [statuses, setStatuses] = useState<readonly string[]>([]);
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
    const resolvedColumns = columns ?? (sortable ? [{ id: "name", header: "Name", kind: "name" as const }, { id: "status", header: "Status", kind: "status" as const }] : undefined);
    const withActions = rowActions && rowActions.length > 0 && resolvedColumns && !resolvedColumns.some((column) => column.kind === "actions")
        ? [...resolvedColumns, { id: "actions", header: "Actions", kind: "actions" as const }]
        : resolvedColumns;

    const filtered = useMemo(() => filterItems(items, withActions, query, statuses), [items, withActions, query, statuses]);
    const sorted = useMemo(() => sortItems(filtered, withActions, sortable ? sort : null), [filtered, withActions, sortable, sort]);
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
    const template = withActions ? templateFor(withActions, multiple, expandable) : undefined;

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

    function toggleStatus(status: string) {
        setPage(1);
        setStatuses((current) => (current.includes(status) ? current.filter((item) => item !== status) : [...current, status]));
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

    function renderValue(column: TableColumn, item: TableItem): ReactNode {
        const text = columnText(column, item);
        switch (column.kind) {
            case "name":
                return <span className={cx("block truncate font-medium text-ink", cellText[resolved])} title={item.name}>{item.name}</span>;
            case "text":
            case "date":
                return <span className={cx("block max-w-spacing-13 truncate text-muted", cellText[resolved])} title={text}>{text}</span>;
            case "number":
                return <span className={cx("block tabular-nums text-ink", cellText[resolved])}>{text}</span>;
            case "status":
                return <Badge variant={item.statusVariant}>{item.status}</Badge>;
            case "link":
                return (
                    <a href={item.hrefs?.[column.id] ?? "#"} className={cx("block max-w-spacing-13 truncate text-accent", cellText[resolved])} title={text} onClick={(event) => event.stopPropagation()}>
                        {text}
                    </a>
                );
            case "actions":
                return rowActions && rowActions.length > 0 ? (
                    <RowMenu label="Actions" actions={rowActions} onSelect={(actionId) => { onRowAction?.(actionId, item); setNotice(`${actionId} ${item.name}`); }} />
                ) : null;
            case "custom":
                return renderCell ? renderCell(column, item) : <span className={cx("text-ink", cellText[resolved])}>{text}</span>;
            default: {
                const exhaustive: never = column.kind;
                return exhaustive;
            }
        }
    }

    function renderBlock(block: TableBlock) {
        if (block.kind === "group") {
            return (
                <div key={block.key} role="row" className="bg-canvas px-spacing-04 py-spacing-02 text-xs font-medium text-muted">
                    {block.label}
                </div>
            );
        }
        if (block.kind === "detail") {
            return (
                <div key={block.key} role="row" className="bg-canvas px-spacing-05 py-spacing-04 text-sm text-ink">
                    {renderDetail ? renderDetail(block.row.item) : block.row.item.name}
                </div>
            );
        }
        const { item, depth } = block.row;
        const isSelected = item.id === selected;
        const open = openIds.includes(item.id);
        if (!withActions || !template) {
            return (
                <button
                    key={block.key}
                    type="button"
                    aria-current={isSelected ? "true" : undefined}
                    disabled={item.disabled}
                    ref={(node) => { rowRefs.current[item.id] = node; }}
                    onClick={() => { if (!item.disabled) select(item.id); }}
                    onKeyDown={(event) => onRowKey(event, block.row)}
                    className={cx("flex w-full items-center justify-between text-left", rowPad[resolved], isSelected ? "bg-selected" : undefined, item.disabled ? "cursor-not-allowed opacity-50" : undefined)}
                >
                    <span className={cx("min-w-0 font-medium text-ink", cellText[resolved])}>{item.name}</span>
                    <Badge variant={item.statusVariant}>{item.status}</Badge>
                </button>
            );
        }
        return (
            <div
                key={block.key}
                role="row"
                tabIndex={item.disabled ? -1 : item.id === activeId ? 0 : -1}
                aria-selected={isSelected}
                aria-disabled={item.disabled || undefined}
                ref={(node) => { rowRefs.current[item.id] = node; }}
                onClick={() => { if (!item.disabled) select(item.id); }}
                onKeyDown={(event) => onRowKey(event, block.row)}
                className={cx("grid w-full items-center text-left", rowPad[resolved], isSelected ? "bg-selected" : undefined, item.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer")}
                style={{ gridTemplateColumns: template }}
            >
                {multiple ? <Check label={`Select ${item.name}`} checked={checked.includes(item.id)} disabled={item.disabled} onChange={() => toggleChecked(item.id)} /> : null}
                {expandable ? (
                    <button
                        type="button"
                        aria-expanded={open}
                        className="text-xs text-muted"
                        onClick={(event) => { event.stopPropagation(); toggleOpen(item.id); }}
                    >
                        {open ? "Hide" : "Show"}
                    </button>
                ) : null}
                {withActions.map((column) => (
                    <span key={column.id} role="gridcell" className={cx("min-w-0", alignClass(column), column.kind === "name" && depth > 0 ? "pl-spacing-05" : undefined)}>
                        {renderValue(column, item)}
                    </span>
                ))}
            </div>
        );
    }

    const body = loading ? (
        <div className="flex flex-col gap-spacing-03 px-spacing-04 py-spacing-04" aria-busy="true">
            <Loader label="Loading records" variant="text" />
            <Loader label="Loading records" variant="text" />
        </div>
    ) : error ? (
        <p className="px-spacing-04 py-spacing-04 text-sm text-danger" role="alert">{error}</p>
    ) : flat.length === 0 ? (
        <p className="px-spacing-04 py-spacing-04 text-sm text-muted">{query || statuses.length > 0 ? "No records match" : empty}</p>
    ) : (
        <div style={virtualize ? { height: windowed.total, position: "relative" } : undefined}>
            <div style={virtualize ? { transform: `translateY(${windowed.offset}px)` } : undefined}>
                {windowed.blocks.map((block) => renderBlock(block))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-spacing-04">
            {searchable || filterable || size ? (
                <div className="flex flex-wrap items-end gap-spacing-04">
                    {searchable ? (
                        <div className="w-full max-w-sm">
                            <TextField label="Search" type="search" value={query} density={resolved} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
                        </div>
                    ) : null}
                    {size && pageSizeOptions ? (
                        <div className="w-spacing-13">
                            <Select
                                label="Rows"
                                density={resolved}
                                value={String(size)}
                                options={pageSizeOptions.map((option) => ({ value: String(option), label: String(option) }))}
                                onChange={(event) => { setSize(Number(event.target.value)); setPage(1); }}
                            />
                        </div>
                    ) : null}
                </div>
            ) : null}
            {filterable ? (
                <div className="flex flex-wrap items-center gap-spacing-02">
                    {statusOptions.map((status) => (
                        <button key={status} type="button" aria-pressed={statuses.includes(status)} onClick={() => toggleStatus(status)} className={cx("rounded-md px-spacing-03 py-spacing-02 text-sm", statuses.includes(status) ? "bg-selected text-ink" : "text-muted")}>
                            {status}
                        </button>
                    ))}
                    {statuses.map((status) => (
                        <button key={`chip-${status}`} type="button" className="rounded-sm bg-canvas px-spacing-02 py-spacing-01 text-xs text-ink" onClick={() => toggleStatus(status)}>
                            Remove {status}
                        </button>
                    ))}
                    {statuses.length > 0 ? (
                        <button type="button" className="text-sm text-muted" onClick={() => { setStatuses([]); setPage(1); }}>
                            Clear filters
                        </button>
                    ) : null}
                </div>
            ) : null}
            <div className="flex items-center justify-between gap-spacing-03">
                <p className="text-sm text-muted">{loading ? "Loading" : `${sorted.length} ${sorted.length === 1 ? "record" : "records"}`}</p>
                {notice ? <p className="text-sm text-ink">{notice}</p> : null}
            </div>
            {multiple && checked.length > 0 ? (
                <div className="flex flex-wrap items-center gap-spacing-03 rounded-md bg-canvas px-spacing-04 py-spacing-03">
                    <p className="text-sm text-ink">{checked.length} selected</p>
                    {allPageChecked && matchIds.length > pageIds.length ? (
                        <button type="button" className="text-sm text-accent" onClick={() => setChecked(matchIds)}>
                            Select all {matchIds.length} matches
                        </button>
                    ) : null}
                    {bulkActions?.map((action) => (
                        <Button key={action.id} variant="secondary" size="dense" onClick={() => { onBulkAction?.(action.id, checked); setNotice(`${action.label} ${checked.length}`); }}>
                            {action.label}
                        </Button>
                    ))}
                </div>
            ) : null}
            <div className={cx("overflow-x-auto", stickyHeader && !virtualize ? "max-h-96 overflow-y-auto" : undefined, virtualize ? "max-h-96 overflow-y-auto" : undefined)} onScroll={virtualize ? (event) => setScrollTop(event.currentTarget.scrollTop) : undefined}>
                <div role={withActions ? "grid" : "list"} aria-label={label} aria-rowcount={withActions ? sorted.length : undefined} className="min-w-full" style={{ minWidth: withActions ? withActions.length * 140 : undefined }}>
                    {withActions ? (
                        <div role="row" className={cx("grid items-center border-b border-line", rowPad[resolved], stickyHeader ? "sticky top-0 z-10 bg-surface" : undefined)} style={{ gridTemplateColumns: template }}>
                            {multiple ? <Check label={`Select page of ${label}`} checked={allPageChecked} indeterminate={somePageChecked && !allPageChecked} onChange={togglePage} /> : null}
                            {expandable ? <span /> : null}
                            {withActions.map((column) => {
                                const active = sort?.columnId === column.id;
                                const headerClass = cx("text-muted", cellText[resolved], alignClass(column));
                                if (!sortable || column.kind === "actions") {
                                    return <span key={column.id} role="columnheader" className={headerClass}>{column.header}</span>;
                                }
                                return (
                                    <button
                                        key={column.id}
                                        type="button"
                                        role="columnheader"
                                        aria-sort={active ? (sort?.direction === "asc" ? "ascending" : "descending") : "none"}
                                        className={cx(headerClass, "text-left")}
                                        onClick={() => { setSort((current) => nextSort(current, column.id)); setPage(1); }}
                                    >
                                        {column.header}{active ? (sort?.direction === "asc" ? " ↑" : " ↓") : ""}
                                    </button>
                                );
                            })}
                        </div>
                    ) : null}
                    {body}
                </div>
            </div>
            {size && sorted.length > size ? <Pagination total={count} page={currentPage} onPageChange={setPage} /> : null}
        </div>
    );
}
