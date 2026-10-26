import { Button } from "../../base/button";
import type { Density } from "../../base/density";
import { cx } from "../../../utils/cx";
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
    onToggleStatus: (status: string) => void;
    onClearStatuses: () => void;
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
    onToggleStatus,
    onClearStatuses,
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
                    onToggleStatus={onToggleStatus}
                    onClearStatuses={onClearStatuses}
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
    onToggleStatus: (status: string) => void;
    onClearStatuses: () => void;
};

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
    onToggleStatus,
    onClearStatuses,
}: TableColumnHeaderProps) {
    const active = sort?.columnId === column.id;
    const direction = active ? sort?.direction : undefined;
    const pinned = stickyColumn && column.kind === "name";
    const showStatusFilter = filterable && column.kind === "status" && statusOptions.length > 0;
    const headerClass = cx(
        "flex min-w-0 items-center gap-spacing-02",
        cellText[resolved],
        alignClass(column, showStatusFilter),
        pinned ? pinnedNameClass({ stickyColumn: true, depth: 0, isSelected: false, stickyHeaderCorner: stickyHeader }) : undefined,
    );

    return (
        <div role="columnheader" aria-sort={sortable && column.kind !== "actions" ? (direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none") : undefined} className={headerClass}>
            {sortable && column.kind !== "actions" ? (
                <button
                    type="button"
                    className="inline-flex shrink-0 items-center whitespace-nowrap rounded-sm text-muted focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus"
                    onClick={() => {
                        onSortChange(nextSort(sort, column.id));
                        onPageReset();
                    }}
                >
                    {column.header}
                    {direction === "asc" ? <span aria-hidden="true"> ↑</span> : null}
                    {direction === "desc" ? <span aria-hidden="true"> ↓</span> : null}
                    {direction === "asc" ? <span className="sr-only">, sorted ascending</span> : null}
                    {direction === "desc" ? <span className="sr-only">, sorted descending</span> : null}
                </button>
            ) : (
                <span className="whitespace-nowrap text-muted">{column.header}</span>
            )}
            {showStatusFilter ? (
                <div role="group" aria-label="Filter by status" className="flex shrink-0 items-center gap-spacing-02">
                    {statusOptions.map((status) => {
                        const pressed = statuses.includes(status);
                        return (
                            <Button key={status} variant="secondary" size={resolved} aria-pressed={pressed} className={pressed ? "bg-selected" : undefined} onClick={() => onToggleStatus(status)}>
                                {status}
                            </Button>
                        );
                    })}
                    {statuses.length > 0 ? (
                        <Button variant="secondary" size={resolved} onClick={onClearStatuses}>
                            Clear filters
                        </Button>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
