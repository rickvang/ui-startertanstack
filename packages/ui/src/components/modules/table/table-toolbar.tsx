import { Button } from "../../base/button";
import type { Density } from "../../base/density";
import { Select } from "../../base/select";
import { TextField } from "../../base/text-field";
import { cx } from "../../../utils/cx";
import type { TableAction } from "./types";

type TableToolbarProps = {
    resolved: Density;
    searchable: boolean;
    filterable: boolean;
    query: string;
    onQueryChange: (value: string) => void;
    size: number | undefined;
    pageSizeOptions?: readonly number[];
    onSizeChange: (size: number) => void;
    statusOptions: string[];
    statuses: readonly string[];
    onToggleStatus: (status: string) => void;
    onClearStatuses: () => void;
    loading: boolean;
    recordCount: number;
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
    filterable,
    query,
    onQueryChange,
    size,
    pageSizeOptions,
    onSizeChange,
    statusOptions,
    statuses,
    onToggleStatus,
    onClearStatuses,
    loading,
    recordCount,
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
    const showSearchRow = searchable || filterable || size;

    return (
        <>
            {showSearchRow ? (
                <div className="flex flex-wrap items-end gap-spacing-04">
                    {searchable ? (
                        <div className="w-full max-w-sm">
                            <TextField
                                label="Search"
                                type="search"
                                value={query}
                                density={resolved}
                                onChange={(event) => onQueryChange(event.target.value)}
                            />
                        </div>
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
            {filterable ? (
                <div className="flex flex-wrap items-center gap-spacing-02">
                    {statusOptions.map((status) => (
                        <button
                            key={status}
                            type="button"
                            aria-pressed={statuses.includes(status)}
                            onClick={() => onToggleStatus(status)}
                            className={cx("rounded-md px-spacing-03 py-spacing-02 text-sm", statuses.includes(status) ? "bg-selected text-ink" : "text-muted")}
                        >
                            {status}
                        </button>
                    ))}
                    {statuses.map((status) => (
                        <button key={`chip-${status}`} type="button" className="rounded-sm bg-canvas px-spacing-02 py-spacing-01 text-xs text-ink" onClick={() => onToggleStatus(status)}>
                            Remove {status}
                        </button>
                    ))}
                    {statuses.length > 0 ? (
                        <button type="button" className="text-sm text-muted" onClick={onClearStatuses}>
                            Clear filters
                        </button>
                    ) : null}
                </div>
            ) : null}
            <div className="flex items-center justify-between gap-spacing-03">
                <p className="text-sm text-muted">{loading ? "Loading" : `${recordCount} ${recordCount === 1 ? "record" : "records"}`}</p>
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
