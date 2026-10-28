import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

export type ExpandableProps = {
    open: boolean;
    children: ReactNode;
    /** Forces the reduced-motion treatment. The OS setting still applies without this. */
    reduceMotion?: boolean;
};

function prefersReducedMotion() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Expandable({ open, children, reduceMotion = false }: ExpandableProps) {
    const reduce = reduceMotion || prefersReducedMotion();
    const shell = reduce ? "transition-none" : "transition-[grid-template-rows] motion-fade motion-reduce:transition-none";
    const contents = reduce ? "transition-none" : open ? "transition-opacity motion-fade motion-reduce:transition-none" : "transition-opacity motion-leave motion-reduce:transition-none";

    return (
        <div className={cx("grid", shell, open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <div className="overflow-hidden">
                <div className={cx(contents, open ? "opacity-100" : "opacity-0")}>{children}</div>
            </div>
        </div>
    );
}
