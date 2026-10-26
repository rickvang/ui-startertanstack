import { Button } from "../../base/button";
import type { Density } from "../../base/density";
import { Select } from "../../base/select";
import { TextField } from "../../base/text-field";
import { recordSummary } from "./query";
import type { TableAction } from "./types";

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
    const showTools = searchable || Boolean(size);
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
                <p className="pb-spacing-02 text-sm text-muted" aria-live="polite">
                    {loading ? "Loading" : recordSummary(recordCount, totalCount, narrowed)}
                </p>
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
