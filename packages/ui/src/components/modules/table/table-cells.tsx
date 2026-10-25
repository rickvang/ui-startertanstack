import type { ReactNode } from "react";
import { Badge } from "../../base/badge";
import type { Density } from "../../base/density";
import { cx } from "../../../utils/cx";
import { columnText } from "./query";
import { TableRowMenu } from "./table-parts";
import { cellText } from "./table-layout";
import type { TableAction, TableColumn, TableItem } from "./types";

export function renderTableCell(options: {
    column: TableColumn;
    item: TableItem;
    resolved: Density;
    rowActions?: readonly TableAction[];
    onRowAction?: (actionId: string, item: TableItem) => void;
    renderCell?: (column: TableColumn, item: TableItem) => ReactNode;
    onActionNotice: (message: string) => void;
}): ReactNode {
    const { column, item, resolved, rowActions, onRowAction, renderCell, onActionNotice } = options;
    const text = columnText(column, item);
    switch (column.kind) {
        case "name":
            return <span className={cx("block truncate font-medium text-ink", cellText[resolved])} title={item.name}>{item.name}</span>;
        case "text":
        case "date":
            return <span className={cx("block truncate text-muted", cellText[resolved])} title={text}>{text}</span>;
        case "number":
            return <span className={cx("block tabular-nums text-ink", cellText[resolved])}>{text}</span>;
        case "status":
            return <Badge variant={item.statusVariant}>{item.status}</Badge>;
        case "link":
            return (
                <a href={item.hrefs?.[column.id] ?? "#"} className={cx("block truncate text-accent", cellText[resolved])} title={text} onClick={(event) => event.stopPropagation()}>
                    {text}
                </a>
            );
        case "actions":
            return rowActions && rowActions.length > 0 ? (
                <TableRowMenu
                    label="Actions"
                    actions={rowActions}
                    onSelect={(actionId) => {
                        onRowAction?.(actionId, item);
                        onActionNotice(`${actionId} ${item.name}`);
                    }}
                />
            ) : null;
        case "custom":
            return renderCell ? renderCell(column, item) : <span className={cx("text-ink", cellText[resolved])}>{text}</span>;
        default: {
            const exhaustive: never = column.kind;
            return exhaustive;
        }
    }
}
