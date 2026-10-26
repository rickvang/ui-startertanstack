import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../../base/button";
import { Checkbox } from "../../base/checkbox";
import type { Density } from "../../base/density";

type StatusFilterMenuProps = {
    anchor: HTMLElement;
    options: readonly string[];
    selected: readonly string[];
    density: Density;
    onApply: (statuses: readonly string[]) => void;
    onClose: () => void;
};

export function StatusFilterMenu({ anchor, options, selected, density, onApply, onClose }: StatusFilterMenuProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const [draft, setDraft] = useState<readonly string[]>(selected);
    const [place, setPlace] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const rect = anchor.getBoundingClientRect();
        const width = 160;
        const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
        setPlace({ top: rect.bottom + 4, left });
        panelRef.current?.focus();
    }, [anchor]);

    useEffect(() => {
        function onKey(event: KeyboardEvent) {
            if (event.key !== "Escape") {
                return;
            }
            event.preventDefault();
            onClose();
        }
        function onPointer(event: PointerEvent) {
            const target = event.target;
            if (!(target instanceof Node)) {
                return;
            }
            if (panelRef.current?.contains(target) || anchor.contains(target)) {
                return;
            }
            onClose();
        }
        document.addEventListener("keydown", onKey);
        document.addEventListener("pointerdown", onPointer);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("pointerdown", onPointer);
        };
    }, [anchor, onClose]);

    return createPortal(
        <div
            ref={panelRef}
            role="dialog"
            aria-label="Filter by status"
            tabIndex={-1}
            style={{ top: place.top, left: place.left }}
            className="fixed z-50 flex w-spacing-13 flex-col gap-spacing-03 rounded-md border border-line bg-surface p-spacing-03 shadow-lg"
        >
            {options.map((status) => (
                <Checkbox
                    key={status}
                    label={status}
                    density={density}
                    checked={draft.includes(status)}
                    onChange={() => {
                        setDraft((current) => (current.includes(status) ? current.filter((item) => item !== status) : [...current, status]));
                    }}
                />
            ))}
            <div className="flex justify-end gap-spacing-02 border-t border-line pt-spacing-03">
                <Button variant="ghost" size="dense" onClick={() => setDraft([])}>
                    Reset
                </Button>
                <Button
                    variant="primary"
                    size="dense"
                    onClick={() => {
                        onApply(draft);
                        onClose();
                    }}
                >
                    OK
                </Button>
            </div>
        </div>,
        document.body,
    );
}
