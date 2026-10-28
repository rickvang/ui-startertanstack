import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

export type PlaceholderProps = {
    ready: boolean;
    placeholder: ReactNode;
    children: ReactNode;
    /** Forces the reduced-motion treatment. The OS setting still applies without this. */
    reduceMotion?: boolean;
    /** Drops the transition for one paint, so a replay does not animate backwards. */
    snap?: boolean;
};

function prefersReducedMotion() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Placeholder({ ready, placeholder, children, reduceMotion = false, snap = false }: PlaceholderProps) {
    const still = snap || reduceMotion || prefersReducedMotion();
    const leave = still ? "transition-none" : "transition-[opacity,filter] motion-leave motion-reduce:transition-none";
    const enter = still ? "transition-none" : "transition-[opacity,transform,filter] motion-enter motion-reduce:transition-none";

    return (
        <div className="grid">
            <div className={cx("col-start-1 row-start-1", leave, ready ? "opacity-0 blur-soft" : "opacity-100 blur-none")}>{placeholder}</div>
            <div
                className={cx(
                    "col-start-1 row-start-1",
                    enter,
                    ready ? "translate-y-0 scale-100 opacity-100 blur-none" : "pointer-events-none translate-y-spacing-02 scale-[var(--motion-scale-enter)] opacity-0 blur-soft",
                )}
            >
                {children}
            </div>
        </div>
    );
}
