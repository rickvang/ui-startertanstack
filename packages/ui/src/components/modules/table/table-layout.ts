import type { Density } from "../../base/density";
import { cx } from "../../../utils/cx";
import type { TableColumn } from "./types";

export const rowPad: Record<Density, string> = {
    dense: "gap-spacing-03 px-spacing-03 py-spacing-01",
    standard: "gap-spacing-03 px-spacing-04 py-spacing-02",
    wide: "gap-spacing-04 px-spacing-05 py-spacing-03",
};

export const rowY: Record<Density, string> = {
    dense: "py-spacing-01",
    standard: "py-spacing-02",
    wide: "py-spacing-03",
};

export const cellText: Record<Density, string> = {
    dense: "text-xs",
    standard: "text-sm",
    wide: "text-sm",
};

export function rowHeight(density: Density): number {
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

const columnTrack: Record<TableColumn["kind"], string> = {
    name: "minmax(var(--spacing-spacing-12), 1.4fr)",
    custom: "minmax(var(--spacing-spacing-12), 1.4fr)",
    text: "minmax(var(--spacing-spacing-12), 1fr)",
    link: "minmax(var(--spacing-spacing-12), 1fr)",
    number: "var(--spacing-spacing-10)",
    date: "var(--spacing-spacing-12)",
    status: "var(--spacing-spacing-11)",
    actions: "var(--spacing-spacing-12)",
};

export function templateFor(columns: readonly TableColumn[], multiple: boolean, expandable: boolean, filterStatus = false): string {
    const tracks = columns.map((column) => (filterStatus && column.kind === "status" ? "var(--spacing-spacing-12)" : columnTrack[column.kind]));
    return [multiple ? "var(--spacing-spacing-07)" : null, expandable ? "var(--spacing-spacing-10)" : null, ...tracks].filter((track) => track !== null).join(" ");
}

export function alignClass(column: TableColumn, filterStatus = false): string | undefined {
    if (filterStatus && column.kind === "status") {
        return "justify-self-start text-left";
    }
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

export function pinnedNameClass({
    stickyColumn,
    depth,
    isSelected,
    stickyHeaderCorner,
}: {
    stickyColumn: boolean;
    depth: number;
    isSelected: boolean;
    stickyHeaderCorner?: boolean;
}): string | undefined {
    if (!stickyColumn) {
        return depth > 0 ? "pl-spacing-05" : undefined;
    }
    const background = isSelected ? "bg-selected" : "bg-surface";
    const shadow = isSelected ? "shadow-[0.5rem_0_0_var(--color-selected)]" : "shadow-[0.5rem_0_0_var(--color-surface)]";
    return cx(
        "sticky left-0 z-[1] min-w-0 w-full self-stretch border-r border-line",
        depth > 0 ? "pl-spacing-07" : "pl-spacing-04",
        background,
        shadow,
        stickyHeaderCorner ? "top-0 z-[3]" : undefined,
    );
}

export function pinnedGroupNameClass(stickyColumn: boolean): string {
    if (!stickyColumn) {
        return "py-spacing-02";
    }
    return cx(
        "sticky left-0 z-[1] min-w-0 w-full self-stretch border-r border-line bg-canvas py-spacing-02 pl-spacing-04 shadow-[0.5rem_0_0_var(--color-canvas)]",
    );
}
