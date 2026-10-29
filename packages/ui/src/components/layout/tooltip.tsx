import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type TooltipProps = {
    label: string;
    children: ReactNode;
};

export function Tooltip({ label, children }: TooltipProps) {
    const tooltipId = useId();
    const rootRef = useRef<HTMLSpanElement>(null);
    const tipRef = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState(false);
    const [place, setPlace] = useState<{ top: number; left: number } | null>(null);

    useLayoutEffect(() => {
        if (!shown) {
            setPlace(null);
            return;
        }

        function placeTip() {
            const root = rootRef.current;
            const tip = tipRef.current;
            if (!root || !tip) {
                return;
            }
            const rect = root.getBoundingClientRect();
            const width = tip.offsetWidth;
            const height = tip.offsetHeight;
            const gap = 8;
            const rawLeft = rect.left + rect.width / 2 - width / 2;
            const left = Math.max(8, Math.min(rawLeft, window.innerWidth - width - 8));
            const below = rect.bottom + gap;
            const above = rect.top - height - gap;
            const top = above >= 8 ? above : below;
            setPlace((current) => (current && Math.abs(current.top - top) < 0.5 && Math.abs(current.left - left) < 0.5 ? current : { top, left }));
        }

        placeTip();
        window.addEventListener("resize", placeTip);
        window.addEventListener("scroll", placeTip, true);
        return () => {
            window.removeEventListener("resize", placeTip);
            window.removeEventListener("scroll", placeTip, true);
        };
    }, [shown]);

    return (
        <span
            ref={rootRef}
            className="relative inline-flex"
            onMouseEnter={() => setShown(true)}
            onMouseLeave={() => setShown(false)}
            onFocus={() => setShown(true)}
            onBlur={() => setShown(false)}
        >
            <span className="inline-flex" aria-describedby={shown ? tooltipId : undefined}>
                {children}
            </span>
            {shown
                ? createPortal(
                      <span
                          ref={tipRef}
                          id={tooltipId}
                          role="tooltip"
                          style={{ top: place?.top ?? 0, left: place?.left ?? 0, visibility: place ? "visible" : "hidden" }}
                          className="fixed z-50 w-max max-w-xs rounded-md bg-ink px-spacing-03 py-spacing-02 text-xs text-canvas"
                      >
                          {label}
                      </span>,
                      document.body,
                  )
                : null}
        </span>
    );
}
