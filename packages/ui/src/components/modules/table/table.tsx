import { Loader } from "../../base/loader";
import { Pagination } from "../../navigation/pagination";
import { cx } from "../../../utils/cx";
import { TableHeaderRow } from "./table-header";
import { renderTableBlock } from "./table-rows";
import { TableToolbar } from "./table-toolbar";
import type { TableProps } from "./types";
import { useTable } from "./use-table";

export type { TableProps } from "./types";

export function Table(props: TableProps) {
    const {
        label,
        searchable = false,
        filterable = false,
        sortable = false,
        expandable = false,
        renderDetail,
        renderCell,
        rowActions,
        onRowAction,
        bulkActions,
        onBulkAction,
        loading = false,
        error,
        empty = "No records",
        pageSizeOptions,
        stickyHeader = false,
        stickyColumn = false,
        virtualize = false,
    } = props;

    const table = useTable(props);
    const {
        resolved,
        selected,
        activeId,
        query,
        setQuery,
        statuses,
        setStatuses,
        sort,
        setSort,
        checked,
        setChecked,
        openIds,
        setPage,
        size,
        setSize,
        setScrollTop,
        notice,
        setNotice,
        rowRefs,
        multiple,
        withActions,
        sorted,
        count,
        currentPage,
        flat,
        windowed,
        statusOptions,
        matchIds,
        pageIds,
        allPageChecked,
        somePageChecked,
        template,
        select,
        toggleChecked,
        togglePage,
        toggleOpen,
        onRowKey,
    } = table;

    const rowContext = {
        resolved,
        withActions: withActions ?? [],
        template,
        selected,
        activeId,
        checked,
        openIds,
        multiple,
        expandable,
        filterable,
        stickyColumn,
        rowActions,
        onRowAction,
        renderCell,
        renderDetail,
        rowRefs,
        select,
        toggleChecked,
        toggleOpen,
        onRowKey,
        setNotice,
    };

    const rows = windowed.blocks.map((block) => renderTableBlock(block, rowContext));
    const body = loading ? (
        <div className="col-span-full flex flex-col gap-spacing-03 px-spacing-04 py-spacing-04" aria-busy="true">
            <Loader label="Loading records" variant="text" />
            <Loader label="Loading records" variant="text" />
        </div>
    ) : error ? (
        <p className="col-span-full px-spacing-04 py-spacing-04 text-sm text-danger" role="alert">{error}</p>
    ) : flat.length === 0 ? (
        <p className="col-span-full px-spacing-04 py-spacing-04 text-sm text-muted">{query || statuses.length > 0 ? "No records match" : empty}</p>
    ) : virtualize ? (
        <div className="col-span-full" style={{ height: windowed.total, position: "relative" }}>
            <div className="grid" style={{ transform: `translateY(${windowed.offset}px)`, gridTemplateColumns: template }}>
                {rows}
            </div>
        </div>
    ) : (
        <div className="contents">{rows}</div>
    );

    return (
        <div className="flex flex-col gap-spacing-04">
            <TableToolbar
                resolved={resolved}
                searchable={searchable}
                query={query}
                onQueryChange={(value) => { setQuery(value); setPage(1); }}
                size={size}
                pageSizeOptions={pageSizeOptions}
                onSizeChange={(next) => { setSize(next); setPage(1); }}
                statuses={statuses}
                loading={loading}
                recordCount={sorted.length}
                totalCount={props.items.length}
                notice={notice}
                multiple={multiple}
                checkedCount={checked.length}
                allPageChecked={allPageChecked}
                matchCount={matchIds.length}
                pageMatchCount={pageIds.length}
                onSelectAllMatches={() => setChecked(matchIds)}
                bulkActions={bulkActions}
                onBulkAction={onBulkAction}
                checked={checked}
                onBulkNotice={setNotice}
            />
            <div
                className={cx("overflow-x-auto", stickyHeader || virtualize ? "max-h-48 overflow-y-auto" : undefined)}
                onScroll={virtualize ? (event) => setScrollTop(event.currentTarget.scrollTop) : undefined}
            >
                <div
                    role={withActions ? "grid" : "list"}
                    aria-label={label}
                    aria-rowcount={withActions ? sorted.length : undefined}
                    className={withActions ? cx("grid min-w-full gap-x-spacing-03", stickyHeader ? "pr-spacing-04" : "px-spacing-04") : "min-w-full"}
                    style={withActions ? { gridTemplateColumns: template, minWidth: withActions.length * 140 } : undefined}
                >
                    {withActions ? (
                        <TableHeaderRow
                            label={label}
                            resolved={resolved}
                            withActions={withActions}
                            multiple={multiple}
                            expandable={expandable}
                            sortable={sortable}
                            filterable={filterable}
                            sort={sort}
                            onSortChange={setSort}
                            onPageReset={() => setPage(1)}
                            stickyHeader={stickyHeader}
                            stickyColumn={stickyColumn}
                            allPageChecked={allPageChecked}
                            somePageChecked={somePageChecked}
                            onTogglePage={togglePage}
                            statusOptions={statusOptions}
                            statuses={statuses}
                            onApplyStatuses={(next) => { setStatuses(next); setPage(1); }}
                        />
                    ) : null}
                    {body}
                </div>
            </div>
            {size && sorted.length > size ? <Pagination total={count} page={currentPage} onPageChange={setPage} /> : null}
        </div>
    );
}
