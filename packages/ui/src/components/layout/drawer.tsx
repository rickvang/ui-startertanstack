import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "../base/button";

export type DrawerProps = {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
    /** Forces the reduced-motion treatment. The OS setting still applies without this. */
    reduceMotion?: boolean;
};

function travelMs() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--motion-duration-300");
    const ms = Number.parseFloat(raw);
    return Number.isFinite(ms) ? ms : 300;
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Drawer({ open, title, children, onClose, reduceMotion = false }: DrawerProps) {
    const [present, setPresent] = useState(open);
    const [shown, setShown] = useState(false);
    const reduce = reduceMotion || (typeof window !== "undefined" && prefersReducedMotion());

    useEffect(() => {
        if (open) {
            setPresent(true);
            if (reduce) {
                setShown(true);
                return;
            }
            const frame = requestAnimationFrame(() => setShown(true));
            return () => cancelAnimationFrame(frame);
        }

        setShown(false);
        const delay = reduce ? 0 : travelMs();
        const timeout = window.setTimeout(() => setPresent(false), delay);
        return () => window.clearTimeout(timeout);
    }, [open, reduce]);

    if (!present) {
        return null;
    }

    return (
        <DrawerFrame title={title} shown={shown} reduce={reduce} onClose={onClose}>
            {children}
        </DrawerFrame>
    );
}

function DrawerFrame({
    title,
    children,
    shown,
    reduce,
    onClose,
}: {
    title: string;
    children: ReactNode;
    shown: boolean;
    reduce: boolean;
    onClose: () => void;
}) {
    const titleId = useId();
    const closeRef = useRef<HTMLButtonElement>(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        closeRef.current?.focus();

        function onKey(event: KeyboardEvent) {
            if (event.key !== "Escape") {
                return;
            }
            event.preventDefault();
            onCloseRef.current();
        }

        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("keydown", onKey);
            previous?.focus();
        };
    }, []);

    const motion = reduce ? "transition-none" : "transition-[transform,opacity,filter] motion-travel motion-reduce:transition-none";
    const scrim = reduce ? "transition-none" : shown ? "transition-opacity motion-enter motion-reduce:transition-none" : "transition-opacity motion-leave motion-reduce:transition-none";

    return createPortal(
        <div className="fixed inset-0 z-50">
            <button type="button" aria-label="Close" className={`absolute inset-0 bg-overlay ${scrim} ${shown ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className={`absolute inset-y-0 right-0 flex w-full max-w-sm origin-right flex-col gap-spacing-04 border-l border-line bg-surface p-spacing-05 shadow-xl ${motion} ${shown ? "translate-x-0 scale-100 opacity-100 blur-none" : "translate-x-full scale-[var(--motion-scale-enter)] opacity-0 blur-soft"}`}
            >
                <header className="flex items-center justify-between gap-spacing-03">
                    <h2 id={titleId} className="text-lg font-semibold text-ink">
                        {title}
                    </h2>
                    <Button ref={closeRef} variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </header>
                <div className="flex min-h-0 flex-1 flex-col gap-spacing-04 overflow-auto text-sm text-ink">{children}</div>
            </div>
        </div>,
        document.body,
    );
}
