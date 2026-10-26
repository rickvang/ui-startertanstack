import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "../base/button";

export type DialogProps = {
    title: string;
    children: ReactNode;
    confirmLabel: string;
    confirmDisabled?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export function Dialog({ title, children, confirmLabel, confirmDisabled = false, onConfirm, onCancel }: DialogProps) {
    const titleId = useId();
    const cancelRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        cancelRef.current?.focus();
    }, []);

    useEffect(() => {
        function onKey(event: KeyboardEvent) {
            if (event.key !== "Escape") {
                return;
            }
            event.preventDefault();
            onCancel();
        }

        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onCancel]);

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-spacing-05">
            <button type="button" aria-label="Close" className="absolute inset-0 bg-overlay" onClick={onCancel} />
            <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative flex w-full max-w-sm flex-col gap-spacing-04 rounded-md bg-surface p-spacing-05 shadow-xl">
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
