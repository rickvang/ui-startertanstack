import { useEffect, useRef, useState } from "react";
import { Button } from "../../base/button";
import { AnchoredPanel } from "./table-menu";
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
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);

    return (
        <div className="justify-self-end">
            <Button ref={buttonRef} variant="ghost" size="dense" aria-expanded={open} aria-haspopup="menu" onClick={(event) => { event.stopPropagation(); setOpen((value) => !value); }}>
                {label}
            </Button>
            {open && buttonRef.current ? (
                <AnchoredPanel anchor={buttonRef.current} label={label} role="menu" align="end" className="flex min-w-spacing-12 flex-col p-spacing-02" onClose={() => setOpen(false)}>
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
                </AnchoredPanel>
            ) : null}
        </div>
    );
}
