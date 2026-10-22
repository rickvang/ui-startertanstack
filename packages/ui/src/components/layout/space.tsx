import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

type SpaceGap = "sm" | "md" | "lg";

export type SpaceProps = HTMLAttributes<HTMLDivElement> & {
    gap?: SpaceGap;
    children: ReactNode;
};

const gapClass: Record<SpaceGap, string> = {
    sm: "gap-spacing-03",
    md: "gap-spacing-05",
    lg: "gap-spacing-07",
};

export function Space({ gap = "sm", className, children, ...props }: SpaceProps) {
    return (
        <div className={cx("flex flex-wrap items-center", gapClass[gap], className)} {...props}>
            {children}
        </div>
    );
}
