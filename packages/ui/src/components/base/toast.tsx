import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cx } from "../../utils/cx";
import { Button } from "./button";
import type { MessageTone } from "./message";

export type ToastPlacement = "bottom" | "end";

export type ToastProps = {
    open: boolean;
    title: string;
    children: ReactNode;
    onDismiss: () => void;
    tone?: MessageTone;
    placement?: ToastPlacement;
    /** Forces the reduced-motion treatment. The OS setting still applies without this. */
    reduceMotion?: boolean;
};

const toneClass: Record<MessageTone, string> = {
    neutral: "border-line bg-canvas text-ink",
    success: "border-line bg-accent-subtle text-ink",
    danger: "border-danger bg-danger-subtle text-ink",
};

function leaveMs() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--motion-duration-100");
    const ms = Number.parseFloat(raw);
    return Number.isFinite(ms) ? ms : 100;
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function placementClass(placement: ToastPlacement): string {
    switch (placement) {
        case "bottom":
            return "bottom-spacing-05 left-1/2 -translate-x-1/2";
        case "end":
            return "top-spacing-05 right-spacing-05";
        default: {
            const exhaustive: never = placement;
            return exhaustive;
        }
    }
}

export function Toast({ open, title, children, onDismiss, tone = "neutral", placement = "bottom", reduceMotion = false }: ToastProps) {
    const [present, setPresent] = useState(open);
    const [shown, setShown] = useState(false);
    const reduce = reduceMotion || (typeof window !== "undefined" && prefersReducedMotion());

    useEffect(() => {
        if (open) {
            setPresent(true);
            if (reduce) {
                setShown(true);
            }
            return;
        }

        setShown(false);
        const delay = reduce ? 0 : leaveMs();
        const timeout = window.setTimeout(() => setPresent(false), delay);
        return () => window.clearTimeout(timeout);
    }, [open, reduce]);

    useEffect(() => {
        if (!present || !open || reduce) {
            return;
        }
        const frame = requestAnimationFrame(() => setShown(true));
        return () => cancelAnimationFrame(frame);
    }, [present, open, reduce]);

    if (!present) {
        return null;
    }

    const fade = reduce ? "transition-none" : shown ? "transition-opacity motion-fade motion-reduce:transition-none" : "transition-opacity motion-leave motion-reduce:transition-none";

    return createPortal(
        <div
            role={tone === "danger" ? "alert" : "status"}
            className={cx(
                "fixed z-40 flex w-[calc(100%-var(--spacing-spacing-05)*2)] max-w-sm flex-col gap-spacing-02 rounded-md border px-spacing-04 py-spacing-03 shadow-lg",
                toneClass[tone],
                placementClass(placement),
                fade,
                shown ? "opacity-100" : "opacity-0",
            )}
        >
            <div className="flex items-start justify-between gap-spacing-03">
                <p className="text-sm font-medium">{title}</p>
                <Button variant="ghost" size="dense" onClick={onDismiss}>
                    Close
                </Button>
            </div>
            <div className="text-sm">{children}</div>
        </div>,
        document.body,
    );
}
