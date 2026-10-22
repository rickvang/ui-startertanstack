import { useState } from "react";
import { cx } from "../../utils/cx";

export type PaginationProps = {
    total: number;
    page?: number;
    defaultPage?: number;
    onPageChange?: (page: number) => void;
    className?: string;
};

export function Pagination({ total, page, defaultPage = 1, onPageChange, className }: PaginationProps) {
    const [uncontrolled, setUncontrolled] = useState(defaultPage);
    const current = page ?? uncontrolled;
    const pages = Array.from({ length: total }, (_, index) => index + 1);

    function go(next: number) {
        const bounded = Math.min(Math.max(total, 1), Math.max(1, next));
        if (page === undefined) {
            setUncontrolled(bounded);
        }
        onPageChange?.(bounded);
    }

    return (
        <nav aria-label="Pagination" className={cx("flex items-center gap-spacing-02", className)}>
            <button type="button" className="px-spacing-03 py-spacing-02 text-sm text-ink disabled:opacity-50" disabled={current === 1 || total === 0} onClick={() => go(current - 1)}>
                Previous
            </button>
            {pages.map((item) => (
                <button
                    key={item}
                    type="button"
                    aria-current={item === current ? "page" : undefined}
                    onClick={() => go(item)}
                    className={cx("size-spacing-07 rounded-md text-sm", item === current ? "bg-selected font-medium text-ink" : "text-muted")}
                >
                    {item}
                </button>
            ))}
            <button type="button" className="px-spacing-03 py-spacing-02 text-sm text-ink disabled:opacity-50" disabled={current === total || total === 0} onClick={() => go(current + 1)}>
                Next
            </button>
        </nav>
    );
}
