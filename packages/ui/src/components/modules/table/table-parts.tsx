import { useEffect, useId, useRef, useState } from "react";
import { Button } from "../../base/button";
import type { TableAction } from "./types";

export function TableCheck({ label, checked, indeterminate, disabled, onChange }: { label: string; checked: boolean; indeterminate?: boolean; disabled?: boolean; onChange: () => void }) {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = indeterminate ?? false;
        }
    }, [indeterminate]);

    return (
        <input
            ref={ref}
            type="checkbox"
            aria-label={label}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            onClick={(event) => event.stopPropagation()}
            className="size-spacing-04 accent-accent disabled:opacity-50"
        />
    );
}

export function TableRowMenu({ label, actions, onSelect }: { label: string; actions: readonly TableAction[]; onSelect: (id: string) => void }) {
    const [open, setOpen] = useState(false);
    const menuId = useId();

    return (
        <div className="relative justify-self-end">
            <Button variant="ghost" size="dense" aria-expanded={open} aria-controls={menuId} onClick={(event) => { event.stopPropagation(); setOpen((value) => !value); }}>
                {label}
            </Button>
            {open ? (
                <div id={menuId} role="menu" className="absolute right-0 z-20 mt-spacing-02 flex min-w-spacing-12 flex-col rounded-md border border-line bg-surface p-spacing-02">
                    {actions.map((action) => (
                        <button
                            key={action.id}
                            type="button"
                            role="menuitem"
                            className="rounded-md px-spacing-03 py-spacing-02 text-left text-sm text-ink hover:bg-canvas"
                            onClick={(event) => {
                                event.stopPropagation();
                                setOpen(false);
                                onSelect(action.id);
                            }}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
