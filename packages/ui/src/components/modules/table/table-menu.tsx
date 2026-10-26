import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../../base/button";
import { Checkbox } from "../../base/checkbox";
import type { Density } from "../../base/density";
import { cx } from "../../../utils/cx";

type Align = "start" | "end";

type AnchoredPanelProps = {
    anchor: HTMLElement;
    label: string;
    role: "dialog" | "menu";
    align?: Align;
    className: string;
    children: ReactNode;
    onClose: () => void;
};

export function AnchoredPanel({ anchor, label, role, align = "start", className, children, onClose }: AnchoredPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const [place, setPlace] = useState<{ top: number; left: number } | null>(null);

    useEffect(() => {
        function placePanel() {
            const panel = panelRef.current;
            if (!panel) {
                return;
            }
            const rect = anchor.getBoundingClientRect();
            const width = panel.offsetWidth;
            const height = panel.offsetHeight;
            const rawLeft = align === "end" ? rect.right - width : rect.left;
            const left = Math.max(8, Math.min(rawLeft, window.innerWidth - width - 8));
            const below = rect.bottom + 4;
            const above = rect.top - height - 4;
            const fitsBelow = below + height <= window.innerHeight - 8;
            const top = fitsBelow || above < 8 ? below : above;
            setPlace((current) => (current && Math.abs(current.top - top) < 0.5 && Math.abs(current.left - left) < 0.5 ? current : { top, left }));
        }
        placePanel();
        panelRef.current?.focus();
        window.addEventListener("resize", placePanel);
        window.addEventListener("scroll", placePanel, true);
        return () => {
            window.removeEventListener("resize", placePanel);
            window.removeEventListener("scroll", placePanel, true);
        };
    }, [align, anchor]);

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
            role={role}
            aria-label={label}
            tabIndex={-1}
            style={{ top: place?.top ?? 0, left: place?.left ?? 0, visibility: place ? "visible" : "hidden" }}
            className={cx("fixed z-50 rounded-md border border-line bg-surface shadow-lg", className)}
        >
            {children}
        </div>,
        document.body,
    );
}

export type CheckboxMenuOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

type CheckboxMenuProps = {
    anchor: HTMLElement;
    label: string;
    options: readonly CheckboxMenuOption[];
    selected: readonly string[];
    resetTo: readonly string[];
    density: Density;
    align?: Align;
    onApply: (selected: readonly string[]) => void;
    onClose: () => void;
};

export function CheckboxMenu({ anchor, label, options, selected, resetTo, density, align = "start", onApply, onClose }: CheckboxMenuProps) {
    const [draft, setDraft] = useState<readonly string[]>(selected);

    return (
        <AnchoredPanel anchor={anchor} label={label} role="dialog" align={align} className="flex w-spacing-13 flex-col gap-spacing-03 p-spacing-03" onClose={onClose}>
            <div className="flex max-h-64 flex-col gap-spacing-03 overflow-y-auto">
                {options.map((option) => (
                    <Checkbox
                        key={option.value}
                        label={option.label}
                        density={density}
                        checked={draft.includes(option.value)}
                        disabled={option.disabled}
                        onChange={() => {
                            if (option.disabled) {
                                return;
                            }
                            setDraft((current) => (current.includes(option.value) ? current.filter((item) => item !== option.value) : [...current, option.value]));
                        }}
                    />
                ))}
            </div>
            <div className="flex justify-end gap-spacing-02 border-t border-line pt-spacing-03">
                <Button variant="ghost" size="dense" onClick={() => setDraft(resetTo)}>
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
        </AnchoredPanel>
    );
}
