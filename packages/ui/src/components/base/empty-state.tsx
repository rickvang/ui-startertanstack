import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

export type EmptyStateProps = {
    title: string;
    action?: ReactNode;
    children?: ReactNode;
    className?: string;
};

export function EmptyState({ title, action, children, className }: EmptyStateProps) {
    return (
        <div className={cx("flex flex-col items-start gap-spacing-04", className)}>
            <div className="flex flex-col gap-spacing-02">
                <p className="text-sm font-medium text-ink">{title}</p>
                {children ? <div className="text-sm text-muted">{children}</div> : null}
            </div>
            {action}
        </div>
    );
}
