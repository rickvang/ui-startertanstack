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
    sort: SortState | null;
    onSortChange: (sort: SortState | null) => void;
    onPageReset: () => void;
    stickyHeader: boolean;
    stickyColumn: boolean;
    allPageChecked: boolean;
    somePageChecked: boolean;
    onTogglePage: () => void;
};

export function TableHeaderRow({
    label,
    resolved,
    withActions,
    multiple,
    expandable,
    sortable,
    sort,
    onSortChange,
    onPageReset,
    stickyHeader,
    stickyColumn,
    allPageChecked,
    somePageChecked,
    onTogglePage,
}: TableHeaderRowProps) {
    return (
        <div
            role="row"
            className={cx("col-span-full grid items-center border-b border-line", rowY[resolved], stickyHeader ? "sticky top-0 z-20 bg-surface" : undefined)}
            style={{ gridTemplateColumns: "subgrid" }}
        >
            {multiple ? <TableCheck label={`Select page of ${label}`} checked={allPageChecked} indeterminate={somePageChecked && !allPageChecked} onChange={onTogglePage} /> : null}
            {expandable ? <span /> : null}
            {withActions.map((column) => {
                const active = sort?.columnId === column.id;
                const pinned = stickyColumn && column.kind === "name";
                const headerClass = cx(
                    "text-muted",
                    cellText[resolved],
                    alignClass(column),
                    pinned ? pinnedNameClass({ stickyColumn: true, depth: 0, isSelected: false, stickyHeaderCorner: stickyHeader }) : undefined,
                );
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
                        onClick={() => {
                            onSortChange(nextSort(sort, column.id));
                            onPageReset();
                        }}
                    >
                        {column.header}{active ? (sort?.direction === "asc" ? " ↑" : " ↓") : ""}
                    </button>
                );
            })}
        </div>
    );
}
