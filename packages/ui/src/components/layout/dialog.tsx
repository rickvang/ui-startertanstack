import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "../base/button";

export type DialogProps = {
    open: boolean;
    title: string;
    children: ReactNode;
    confirmLabel: string;
    confirmDisabled?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    /** Forces the reduced-motion treatment. The OS setting still applies without this. */
    reduceMotion?: boolean;
};

function leaveMs() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--motion-duration-100");
    const ms = Number.parseFloat(raw);
    return Number.isFinite(ms) ? ms : 100;
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Dialog({ open, title, children, confirmLabel, confirmDisabled = false, onConfirm, onCancel, reduceMotion = false }: DialogProps) {
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

    return (
        <DialogFrame title={title} shown={shown} reduce={reduce} confirmLabel={confirmLabel} confirmDisabled={confirmDisabled} onConfirm={onConfirm} onCancel={onCancel}>
            {children}
        </DialogFrame>
    );
}

function DialogFrame({
    title,
    children,
    shown,
    reduce,
    confirmLabel,
    confirmDisabled,
    onConfirm,
    onCancel,
}: {
    title: string;
    children: ReactNode;
    shown: boolean;
    reduce: boolean;
    confirmLabel: string;
    confirmDisabled: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    const titleId = useId();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const onCancelRef = useRef(onCancel);
    onCancelRef.current = onCancel;

    useEffect(() => {
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        cancelRef.current?.focus();

        function onKey(event: KeyboardEvent) {
            if (event.key !== "Escape") {
                return;
            }
            event.preventDefault();
            onCancelRef.current();
        }

        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("keydown", onKey);
            previous?.focus();
        };
    }, []);

    const fade = reduce ? "transition-none" : shown ? "transition-opacity motion-fade motion-reduce:transition-none" : "transition-opacity motion-leave motion-reduce:transition-none";

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-spacing-05">
            <button type="button" aria-label="Close" className={`absolute inset-0 bg-overlay ${fade} ${shown ? "opacity-100" : "opacity-0"}`} onClick={onCancel} />
            <div role="dialog" aria-modal="true" aria-labelledby={titleId} className={`relative flex w-full max-w-sm flex-col gap-spacing-04 rounded-md bg-surface p-spacing-05 shadow-xl ${fade} ${shown ? "opacity-100" : "opacity-0"}`}>
                <h2 id={titleId} className="text-lg font-semibold text-ink">
                    {title}
                </h2>
                <div className="flex flex-col gap-spacing-04 text-sm text-ink">{children}</div>
                <div className="flex justify-end gap-spacing-03">
                    <Button ref={cancelRef} variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" disabled={confirmDisabled} onClick={onConfirm}>
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
