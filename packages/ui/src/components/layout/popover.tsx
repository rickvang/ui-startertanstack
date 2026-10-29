import { useEffect, useId, useRef, type ReactNode } from "react";

export type PopoverProps = {
    open: boolean;
    title: string;
    trigger: ReactNode;
    children: ReactNode;
    onClose: () => void;
};

export function Popover({ open, title, trigger, children, onClose }: PopoverProps) {
    const titleId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!open) {
            return;
        }

        function onPointer(event: MouseEvent) {
            if (rootRef.current?.contains(event.target as Node)) {
                return;
            }
            onCloseRef.current();
        }

        function onKey(event: KeyboardEvent) {
            if (event.key !== "Escape") {
                return;
            }
            event.preventDefault();
            onCloseRef.current();
        }

        document.addEventListener("mousedown", onPointer);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onPointer);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <div ref={rootRef} className="relative inline-flex">
            {trigger}
            {open ? (
                <div
                    role="dialog"
                    aria-labelledby={titleId}
                    className="absolute top-full left-0 z-20 mt-spacing-02 flex w-[min(18rem,calc(100vw-var(--spacing-spacing-05)*2))] flex-col gap-spacing-03 rounded-md border border-line bg-surface p-spacing-04 shadow-lg"
                >
                    <p id={titleId} className="text-sm font-medium text-ink">
                        {title}
                    </p>
                    <div className="flex flex-col gap-spacing-03 text-sm text-ink">{children}</div>
                </div>
            ) : null}
        </div>
    );
}
