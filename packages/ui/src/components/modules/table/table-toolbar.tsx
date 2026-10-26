import { useRef, useState } from "react";
import { Button } from "../../base/button";
import type { Density } from "../../base/density";
import { Select } from "../../base/select";
import { TextField } from "../../base/text-field";
import { cx } from "../../../utils/cx";
import { CheckboxMenu } from "./table-filter-menu";
import { recordSummary } from "./query";
import type { TableAction, TableColumn } from "./types";

type TableToolbarProps = {
    resolved: Density;
    searchable: boolean;
    query: string;
    onQueryChange: (value: string) => void;
    size: number | undefined;
    pageSizeOptions?: readonly number[];
    onSizeChange: (size: number) => void;
    statuses: readonly string[];
    loading: boolean;
    recordCount: number;
    totalCount: number;
    columnSettings: boolean;
    columns: readonly TableColumn[] | undefined;
    visibleIds: readonly string[];
    onApplyColumns: (visibleIds: readonly string[]) => void;
    notice: string | null;
    multiple: boolean;
    checkedCount: number;
    allPageChecked: boolean;
    matchCount: number;
    pageMatchCount: number;
    onSelectAllMatches: () => void;
    bulkActions?: readonly TableAction[];
    onBulkAction?: (actionId: string, ids: readonly string[]) => void;
    checked: readonly string[];
    onBulkNotice: (message: string) => void;
};

export function TableToolbar({
    resolved,
    searchable,
    query,
    onQueryChange,
    size,
    pageSizeOptions,
    onSizeChange,
    statuses,
    loading,
    recordCount,
    totalCount,
    columnSettings,
    columns,
    visibleIds,
    onApplyColumns,
    notice,
    multiple,
    checkedCount,
    allPageChecked,
    matchCount,
    pageMatchCount,
    onSelectAllMatches,
    bulkActions,
    onBulkAction,
    checked,
    onBulkNotice,
}: TableToolbarProps) {
    const columnsRef = useRef<HTMLButtonElement>(null);
    const [columnsOpen, setColumnsOpen] = useState(false);
    const optionalColumns = columns?.filter((column) => column.kind !== "name" && column.kind !== "actions") ?? [];
    const showColumns = columnSettings && optionalColumns.length > 0;
    const columnsHidden = optionalColumns.some((column) => !visibleIds.includes(column.id));
    const showTools = searchable || Boolean(size) || showColumns;
    const narrowed = query.trim().length > 0 || statuses.length > 0;

    return (
        <>
            <div className="flex flex-wrap items-end justify-between gap-x-spacing-04 gap-y-spacing-03">
                {showTools ? (
                    <div className="flex min-w-0 flex-1 flex-wrap items-end gap-spacing-03">
                        {searchable ? (
                            <div className="min-w-0 max-w-sm flex-1 basis-48">
                                <TextField
                                    label="Search"
                                    type="search"
                                    value={query}
                                    density={resolved}
                                    onChange={(event) => onQueryChange(event.target.value)}
                                />
                            </div>
                        ) : null}
                        {query.length > 0 ? (
                            <Button variant="secondary" size={resolved} onClick={() => onQueryChange("")}>
                                Clear search
                            </Button>
                        ) : null}
                        {size && pageSizeOptions ? (
                            <div className="w-spacing-13">
                                <Select
                                    label="Rows"
                                    density={resolved}
                                    value={String(size)}
                                    options={pageSizeOptions.map((option) => ({ value: String(option), label: String(option) }))}
                                    onChange={(event) => onSizeChange(Number(event.target.value))}
                                />
                            </div>
                        ) : null}
                    </div>
                ) : null}
                <div className="flex items-center gap-spacing-03 pb-spacing-02">
                    {showColumns ? (
                        <button
                            ref={columnsRef}
                            type="button"
                            aria-label={columnsHidden ? "Columns, some hidden" : "Columns"}
                            aria-haspopup="dialog"
                            aria-expanded={columnsOpen}
                            className={cx(
                                "inline-flex size-spacing-07 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
                                columnsHidden ? "text-accent" : "text-muted",
                            )}
                            onClick={() => setColumnsOpen((open) => !open)}
                        >
                            <svg viewBox="0 0 16 16" aria-hidden="true" className="size-spacing-05">
                                <path d="M2.5 3.5h3v9h-3v-9Zm4 0h3v9h-3v-9Zm4 0h3v9h-3v-9Z" fill="none" stroke="currentColor" strokeWidth="1.25" />
                            </svg>
                        </button>
                    ) : null}
                    <p className="text-sm text-muted" aria-live="polite">
                        {loading ? "Loading" : recordSummary(recordCount, totalCount, narrowed)}
                    </p>
                </div>
                {showColumns && columnsOpen && columnsRef.current && columns ? (
                    <CheckboxMenu
                        anchor={columnsRef.current}
                        label="Columns"
                        align="end"
                        options={columns.map((column) => ({
                            value: column.id,
                            label: column.header,
                            disabled: column.kind === "name" || column.kind === "actions",
                        }))}
                        selected={visibleIds}
                        resetTo={columns.map((column) => column.id)}
                        density={resolved}
                        onApply={onApplyColumns}
                        onClose={() => setColumnsOpen(false)}
                    />
                ) : null}
                {notice ? <p className="text-sm text-ink">{notice}</p> : null}
            </div>
            {multiple && checkedCount > 0 ? (
                <div className="flex flex-wrap items-center gap-spacing-03 rounded-md bg-canvas px-spacing-04 py-spacing-03">
                    <p className="text-sm text-ink">{checkedCount} selected</p>
                    {allPageChecked && matchCount > pageMatchCount ? (
                        <button type="button" className="text-sm text-accent" onClick={onSelectAllMatches}>
                            Select all {matchCount} matches
                        </button>
                    ) : null}
                    {bulkActions?.map((action) => (
                        <Button
                            key={action.id}
                            variant="secondary"
                            size="dense"
                            onClick={() => {
                                onBulkAction?.(action.id, checked);
                                onBulkNotice(`${action.label} ${checkedCount}`);
                            }}
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            ) : null}
        </>
    );
}
