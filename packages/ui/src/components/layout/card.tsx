import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

export type CardProps = HTMLAttributes<HTMLElement> & {
    children: ReactNode;
};

export function Card({ className, children, ...props }: CardProps) {
    return (
        <section className={cx("flex flex-col gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-05", className)} {...props}>
            {children}
        </section>
    );
}
