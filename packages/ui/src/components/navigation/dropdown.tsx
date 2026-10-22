import { useState } from "react";
import { cx } from "../../utils/cx";
import { Button } from "../base/button";

export type DropdownProps = {
    label: string;
    items: readonly string[];
    className?: string;
};

export function Dropdown({ label, items, className }: DropdownProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className={cx("relative", className)}>
            <Button variant="secondary" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
                {label}
            </Button>
            {open ? (
                <div className="absolute left-0 z-10 mt-spacing-02 flex w-spacing-12 flex-col gap-spacing-02 rounded-md bg-surface p-spacing-03 shadow-lg">
                    {items.map((item) => (
                        <p key={item} className="text-sm text-ink">
                            {item}
                        </p>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
