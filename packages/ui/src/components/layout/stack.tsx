import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

type StackGap = "sm" | "md" | "lg";

export type StackProps = HTMLAttributes<HTMLDivElement> & {
    gap?: StackGap;
    children: ReactNode;
};

const gapClass: Record<StackGap, string> = {
    sm: "gap-spacing-03",
    md: "gap-spacing-05",
    lg: "gap-spacing-07",
};

export function Stack({ gap = "md", className, children, ...props }: StackProps) {
    return (
        <div className={cx("flex flex-col", gapClass[gap], className)} {...props}>
            {children}
        </div>
    );
}
