import type { ReactNode } from "react";
import { useState } from "react";
import { cx } from "../../utils/cx";

export type TabItem = {
    value: string;
    label: string;
    content: ReactNode;
};

export type TabsProps = {
    items: readonly TabItem[];
    defaultValue?: string;
    className?: string;
};

export function Tabs({ items, defaultValue, className }: TabsProps) {
    const [value, setValue] = useState(defaultValue ?? items[0]?.value);
    const selected = items.find((item) => item.value === value) ?? items[0];

    return (
        <div className={cx("flex flex-col gap-spacing-04", className)}>
            <div role="tablist" className="flex gap-spacing-03 border-b border-line">
                {items.map((item) => {
                    const active = item.value === selected?.value;
                    return (
                        <button
                            key={item.value}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => setValue(item.value)}
                            className={cx("px-spacing-03 py-spacing-02 text-sm", active ? "border-b border-ink font-medium text-ink" : "text-muted")}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>
            <div className="text-sm text-ink">{selected?.content}</div>
        </div>
    );
}
