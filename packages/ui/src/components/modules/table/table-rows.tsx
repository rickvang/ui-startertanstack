import type { KeyboardEvent, ReactNode, RefObject } from "react";
import { Badge } from "../../base/badge";
import type { Density } from "../../base/density";
import { cx } from "../../../utils/cx";
import { renderTableCell } from "./table-cells";
import { TableCheck } from "./table-parts";
import { alignClass, cellText, pinnedGroupNameClass, pinnedNameClass, rowPad, rowY } from "./table-layout";
import type { FlatRow, TableAction, TableBlock, TableColumn, TableItem } from "./types";

export type TableRowsContext = {
    resolved: Density;
    withActions: readonly TableColumn[];
    template: string | undefined;
    selected: string;
    activeId: string;
    checked: readonly string[];
    openIds: readonly string[];
    multiple: boolean;
    expandable: boolean;
    filterable: boolean;
    stickyColumn: boolean;
    rowActions?: readonly TableAction[];
    onRowAction?: (actionId: string, item: TableItem) => void;
    renderCell?: (column: TableColumn, item: TableItem) => ReactNode;
    renderDetail?: (item: TableItem) => ReactNode;
    rowRefs: RefObject<Record<string, HTMLElement | null>>;
    select: (id: string) => void;
    toggleChecked: (id: string) => void;
    toggleOpen: (id: string) => void;
    onRowKey: (event: KeyboardEvent<HTMLElement>, row: FlatRow) => void;
    setNotice: (message: string) => void;
};

export function renderTableBlock(block: TableBlock, ctx: TableRowsContext): ReactNode {
    const { withActions, template, stickyColumn } = ctx;

    if (block.kind === "group") {
        if (withActions && template) {
            return (
                <div
                    key={block.key}
                    role="row"
                    className={cx("col-span-full grid items-center bg-canvas text-xs font-medium text-muted", stickyColumn && "isolate")}
                    style={{ gridTemplateColumns: "subgrid" }}
                >
                    {ctx.multiple ? <span aria-hidden className="min-h-full bg-canvas py-spacing-02" /> : null}
                    {ctx.expandable ? <span aria-hidden className="min-h-full bg-canvas py-spacing-02" /> : null}
                    {withActions.map((column) => {
                        if (column.kind === "name") {
                            return (
                                <span key={column.id} className={pinnedGroupNameClass(stickyColumn)}>
                                    {block.label}
                                </span>
                            );
                        }
                        return <span key={column.id} aria-hidden className="min-h-full bg-canvas py-spacing-02" />;
                    })}
                </div>
            );
        }
        return (
            <div key={block.key} role="row" className="col-span-full bg-canvas px-spacing-04 py-spacing-02 text-xs font-medium text-muted">
                {block.label}
            </div>
        );
    }

    if (block.kind === "detail") {
        return (
            <div key={block.key} role="row" className="col-span-full bg-canvas px-spacing-10 py-spacing-04 text-sm text-ink">
                {ctx.renderDetail ? ctx.renderDetail(block.row.item) : block.row.item.name}
            </div>
        );
    }

    const { item, depth } = block.row;
    const isSelected = item.id === ctx.selected;
    const open = ctx.openIds.includes(item.id);

    if (!withActions || !template) {
        return (
            <button
                key={block.key}
                type="button"
                aria-current={isSelected ? "true" : undefined}
                disabled={item.disabled}
                ref={(node) => { ctx.rowRefs.current[item.id] = node; }}
                onClick={() => { if (!item.disabled) ctx.select(item.id); }}
                onKeyDown={(event) => ctx.onRowKey(event, block.row)}
                className={cx("flex w-full items-center justify-between text-left", rowPad[ctx.resolved], isSelected ? "bg-selected" : undefined, item.disabled ? "cursor-not-allowed opacity-50" : undefined)}
            >
                <span className={cx("min-w-0 font-medium text-ink", cellText[ctx.resolved])}>{item.name}</span>
                <Badge variant={item.statusVariant}>{item.status}</Badge>
            </button>
        );
    }

    return (
        <div
            key={block.key}
            role="row"
            tabIndex={item.disabled ? -1 : item.id === ctx.activeId ? 0 : -1}
            aria-selected={isSelected}
            aria-disabled={item.disabled || undefined}
            ref={(node) => { ctx.rowRefs.current[item.id] = node; }}
            onClick={() => { if (!item.disabled) ctx.select(item.id); }}
            onKeyDown={(event) => ctx.onRowKey(event, block.row)}
            className={cx("col-span-full grid items-center text-left", rowY[ctx.resolved], stickyColumn && "isolate", isSelected ? "bg-selected" : undefined, item.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer")}
            style={{ gridTemplateColumns: "subgrid" }}
        >
            {ctx.multiple ? <TableCheck label={`Select ${item.name}`} checked={ctx.checked.includes(item.id)} disabled={item.disabled} onChange={() => ctx.toggleChecked(item.id)} /> : null}
            {ctx.expandable ? (
                <button
                    type="button"
                    aria-expanded={open}
                    className="whitespace-nowrap text-xs text-muted"
                    onClick={(event) => { event.stopPropagation(); ctx.toggleOpen(item.id); }}
                >
                    {open ? "Hide" : "Show"}
                </button>
            ) : null}
            {withActions.map((column) => (
                <span
                    key={column.id}
                    role="gridcell"
                    className={cx(
                        "min-w-0",
                        alignClass(column, ctx.filterable),
                        column.kind === "name" ? pinnedNameClass({ stickyColumn, depth, isSelected }) : undefined,
                    )}
                >
                    {renderTableCell({
                        column,
                        item,
                        resolved: ctx.resolved,
                        rowActions: ctx.rowActions,
                        onRowAction: ctx.onRowAction,
                        renderCell: ctx.renderCell,
                        onActionNotice: ctx.setNotice,
                    })}
                </span>
            ))}
        </div>
    );
}
