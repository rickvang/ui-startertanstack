import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

type BadgeVariant = "neutral" | "success" | "warning" | "danger";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant;
    children: ReactNode;
};

const variantClass: Record<BadgeVariant, string> = {
    neutral: "bg-canvas text-muted",
    success: "bg-success-subtle text-success",
    warning: "bg-warning-subtle text-warning",
    danger: "bg-danger-subtle text-danger",
};

export function Badge({ variant = "neutral", className, children, ...props }: BadgeProps) {
    return (
        <span className={cx("inline-flex items-center rounded-sm px-spacing-02 text-xs", variantClass[variant], className)} {...props}>
            {children}
        </span>
    );
}
