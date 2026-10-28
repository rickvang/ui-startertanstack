import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

export type CardVariant = "outlined" | "raised" | "quiet";

export type CardProps = HTMLAttributes<HTMLElement> & {
    variant?: CardVariant;
    children: ReactNode;
};

const variantClass: Record<CardVariant, string> = {
    outlined: "border border-line bg-surface",
    raised: "border border-transparent bg-surface shadow-md",
    quiet: "border border-transparent bg-selected",
};

export function Card({ variant = "outlined", className, children, ...props }: CardProps) {
    return (
        <section className={cx("flex flex-col gap-spacing-04 rounded-lg p-spacing-05", variantClass[variant], className)} {...props}>
            {children}
        </section>
    );
}
