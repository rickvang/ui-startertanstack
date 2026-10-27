import { useState } from "react";
import { cx } from "../../utils/cx";

export type MenuItem = {
    value: string;
    label: string;
};

export type MenuProps = {
    items: readonly MenuItem[];
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: "vertical" | "horizontal";
    className?: string;
};

function menuOrientationClass(orientation: "vertical" | "horizontal"): string {
    switch (orientation) {
        case "vertical":
            return "w-full flex-col";
        case "horizontal":
            return "flex-row flex-wrap items-center";
        default: {
            const exhaustive: never = orientation;
            return exhaustive;
        }
    }
}

export function Menu({ items, defaultValue, value, onValueChange, orientation = "vertical", className }: MenuProps) {
    const [uncontrolled, setUncontrolled] = useState(defaultValue ?? items[0]?.value);
    const selected = value ?? uncontrolled;

    return (
        <nav className={cx("flex gap-spacing-02", menuOrientationClass(orientation), className)}>
            {items.map((item) => {
                const current = item.value === selected;
                return (
                    <button
                        key={item.value}
                        type="button"
                        aria-current={current ? "page" : undefined}
                        onClick={() => {
                            if (value === undefined) {
                                setUncontrolled(item.value);
                            }
                            onValueChange?.(item.value);
                        }}
                        className={cx("rounded-md px-spacing-04 py-spacing-02 text-left text-sm", current ? "bg-selected font-medium text-ink" : "text-ink")}
                    >
                        {item.label}
                    </button>
                );
            })}
        </nav>
    );
}
