import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

type FlexDirection = "row" | "column";
type FlexGap = "sm" | "md" | "lg";

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
    direction?: FlexDirection;
    gap?: FlexGap;
    children: ReactNode;
};

const directionClass: Record<FlexDirection, string> = {
    row: "flex-row",
    column: "flex-col",
};

const gapClass: Record<FlexGap, string> = {
    sm: "gap-spacing-03",
    md: "gap-spacing-05",
    lg: "gap-spacing-07",
};

export function Flex({ direction = "row", gap = "md", className, children, ...props }: FlexProps) {
    return (
        <div className={cx("flex", directionClass[direction], gapClass[gap], className)} {...props}>
            {children}
        </div>
    );
}
