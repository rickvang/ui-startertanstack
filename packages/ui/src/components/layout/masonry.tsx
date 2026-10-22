import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

export type MasonryProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

export function Masonry({ className, children, ...props }: MasonryProps) {
    return (
        <div className={cx("columns-2 gap-spacing-04", className)} {...props}>
            {children}
        </div>
    );
}
