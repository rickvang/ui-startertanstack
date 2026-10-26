import { useRef, useState } from "react";
import type { Density } from "../../base/density";
import { cx } from "../../../utils/cx";
import { CheckboxMenu } from "./table-filter-menu";
import { nextSort } from "./query";
import { TableCheck } from "./table-parts";
import { alignClass, cellText, pinnedNameClass, rowY } from "./table-layout";
import type { SortState, TableColumn } from "./types";

type TableHeaderRowProps = {
    label: string;
    resolved: Density;
    withActions: readonly TableColumn[];
    multiple: boolean;
    expandable: boolean;
    sortable: boolean;
    filterable: boolean;
    sort: SortState | null;
    onSortChange: (sort: SortState | null) => void;
    onPageReset: () => void;
    stickyHeader: boolean;
    stickyColumn: boolean;
    allPageChecked: boolean;
    somePageChecked: boolean;
    onTogglePage: () => void;
    statusOptions: readonly string[];
    statuses: readonly string[];
    onApplyStatuses: (statuses: readonly string[]) => void;
};

export function TableHeaderRow({
    label,
    resolved,
    withActions,
    multiple,
    expandable,
    sortable,
    filterable,
    sort,
    onSortChange,
    onPageReset,
    stickyHeader,
    stickyColumn,
    allPageChecked,
    somePageChecked,
    onTogglePage,
    statusOptions,
    statuses,
    onApplyStatuses,
}: TableHeaderRowProps) {
    return (
        <div
            role="row"
            className={cx("col-span-full grid items-center border-b border-line", rowY[resolved], stickyHeader ? "sticky top-0 z-20 bg-surface" : undefined)}
            style={{ gridTemplateColumns: "subgrid" }}
        >
            {multiple ? <TableCheck label={`Select page of ${label}`} checked={allPageChecked} indeterminate={somePageChecked && !allPageChecked} onChange={onTogglePage} /> : null}
            {expandable ? <span /> : null}
            {withActions.map((column) => (
                <TableColumnHeader
                    key={column.id}
                    column={column}
                    resolved={resolved}
                    sortable={sortable}
                    filterable={filterable}
                    sort={sort}
                    onSortChange={onSortChange}
                    onPageReset={onPageReset}
                    stickyHeader={stickyHeader}
                    stickyColumn={stickyColumn}
                    statusOptions={statusOptions}
                    statuses={statuses}
                    onApplyStatuses={onApplyStatuses}
                />
            ))}
        </div>
    );
}

type TableColumnHeaderProps = {
    column: TableColumn;
    resolved: Density;
    sortable: boolean;
    filterable: boolean;
    sort: SortState | null;
    onSortChange: (sort: SortState | null) => void;
    onPageReset: () => void;
    stickyHeader: boolean;
    stickyColumn: boolean;
    statusOptions: readonly string[];
    statuses: readonly string[];
    onApplyStatuses: (statuses: readonly string[]) => void;
};

function SortMark({ direction }: { direction: "asc" | "desc" }) {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-spacing-04 shrink-0">
            {direction === "asc" ? <path d="M8 3.5 12.5 10H3.5L8 3.5Z" fill="currentColor" /> : <path d="M8 12.5 3.5 6h9L8 12.5Z" fill="currentColor" />}
        </svg>
    );
}

function FilterMark({ active }: { active: boolean }) {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-spacing-04">
            <path d="M2 3.5h12L9.5 8.5V12.5L6.5 11V8.5L2 3.5Z" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.25" />
        </svg>
    );
}

function TableColumnHeader({
    column,
    resolved,
    sortable,
    filterable,
    sort,
    onSortChange,
    onPageReset,
    stickyHeader,
    stickyColumn,
    statusOptions,
    statuses,
    onApplyStatuses,
}: TableColumnHeaderProps) {
    const filterRef = useRef<HTMLButtonElement>(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const active = sort?.columnId === column.id;
    const direction = active ? sort?.direction : undefined;
    const pinned = stickyColumn && column.kind === "name";
    const showStatusFilter = filterable && column.kind === "status" && statusOptions.length > 0;
    const filtered = statuses.length > 0;
    const headerClass = cx(
        "flex min-w-0 items-center gap-spacing-02",
        cellText[resolved],
        showStatusFilter ? "w-full justify-self-stretch" : alignClass(column),
        pinned ? pinnedNameClass({ stickyColumn: true, depth: 0, isSelected: false, stickyHeaderCorner: stickyHeader }) : undefined,
    );

    return (
        <div role="columnheader" aria-sort={sortable && column.kind !== "actions" ? (direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none") : undefined} className={headerClass}>
            {sortable && column.kind !== "actions" ? (
                <button
                    type="button"
                    className="inline-flex min-w-0 items-center gap-spacing-01 rounded-sm text-muted focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus"
                    onClick={() => {
                        onSortChange(nextSort(sort, column.id));
                        onPageReset();
                    }}
                >
                    <span className="truncate">{column.header}</span>
                    {direction === "asc" || direction === "desc" ? <SortMark direction={direction} /> : null}
                    {direction === "asc" ? <span className="sr-only">, sorted ascending</span> : null}
                    {direction === "desc" ? <span className="sr-only">, sorted descending</span> : null}
                </button>
            ) : (
                <span className="truncate text-muted">{column.header}</span>
            )}
            {showStatusFilter ? (
                <button
                    ref={filterRef}
                    type="button"
                    aria-label={filtered ? "Filter by status, filters on" : "Filter by status"}
                    aria-haspopup="dialog"
                    aria-expanded={filterOpen}
                    className={cx(
                        "ml-auto inline-flex size-spacing-06 shrink-0 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
                        filtered ? "text-accent" : "text-muted",
                    )}
                    onClick={() => setFilterOpen((open) => !open)}
                >
                    <FilterMark active={filtered} />
                </button>
            ) : null}
            {showStatusFilter && filterOpen && filterRef.current ? (
                <CheckboxMenu
                    anchor={filterRef.current}
                    label="Filter by status"
                    options={statusOptions.map((status) => ({ value: status, label: status }))}
                    selected={statuses}
                    resetTo={[]}
                    density={resolved}
                    onApply={onApplyStatuses}
                    onClose={() => setFilterOpen(false)}
                />
            ) : null}
        </div>
    );
}
