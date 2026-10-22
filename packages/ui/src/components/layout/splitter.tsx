import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

export type SplitterProps = {
    start: ReactNode;
    end: ReactNode;
    className?: string;
};

export function Splitter({ start, end, className }: SplitterProps) {
    return (
        <div className={cx("flex w-full overflow-hidden rounded-md border border-line bg-surface", className)}>
            <div className="min-w-0 flex-1 p-spacing-04 text-sm text-ink">{start}</div>
            <div className="w-px bg-line" />
            <div className="min-w-0 flex-1 p-spacing-04 text-sm text-ink">{end}</div>
        </div>
    );
}
