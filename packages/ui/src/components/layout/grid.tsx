import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

type GridColumns = 2 | 3 | 4;

export type GridProps = HTMLAttributes<HTMLDivElement> & {
    columns?: GridColumns;
    children: ReactNode;
};

const columnClass: Record<GridColumns, string> = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
};

export function Grid({ columns = 3, className, children, ...props }: GridProps) {
    return (
        <div className={cx("grid gap-spacing-04", columnClass[columns], className)} {...props}>
            {children}
        </div>
    );
}
