import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";
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
    /** Forces the reduced-motion treatment. The OS setting still applies without this. */
    reduceMotion?: boolean;
};

export function Tabs({ items, defaultValue, className, reduceMotion = false }: TabsProps) {
    const [value, setValue] = useState(defaultValue ?? items[0]?.value);
    const selected = items.find((item) => item.value === value) ?? items[0];
    const listRef = useRef<HTMLDivElement>(null);
    const placed = useRef(false);
    const [indicator, setIndicator] = useState({ x: 0, width: 0 });
    const [travel, setTravel] = useState(false);

    function readIndicator() {
        const list = listRef.current;
        const tab = list?.querySelector<HTMLElement>(`[data-value="${CSS.escape(selected?.value ?? "")}"]`);
        if (!list || !tab) {
            return null;
        }
        return { x: tab.offsetLeft, width: tab.offsetWidth };
    }

    useLayoutEffect(() => {
        const next = readIndicator();
        if (!next) {
            return;
        }
        if (!placed.current) {
            setTravel(false);
            setIndicator(next);
            const frame = requestAnimationFrame(() => setTravel(true));
            placed.current = true;
            return () => cancelAnimationFrame(frame);
        }
        setTravel(true);
        setIndicator(next);
    }, [selected?.value]);

    useLayoutEffect(() => {
        const list = listRef.current;
        if (!list) {
            return;
        }

        const observer = new ResizeObserver(() => {
            const next = readIndicator();
            if (!next) {
                return;
            }
            setTravel(false);
            setIndicator(next);
            requestAnimationFrame(() => setTravel(true));
        });
        observer.observe(list);
        return () => observer.disconnect();
    }, [selected?.value]);

    return (
        <div className={cx("group flex flex-col gap-spacing-04", className)} data-reduce={reduceMotion ? "true" : undefined}>
            <div ref={listRef} role="tablist" className="relative flex flex-wrap gap-spacing-03 border-b border-line">
                <span
                    aria-hidden
                    className={cx(
                        "pointer-events-none absolute bottom-0 h-px bg-ink",
                        travel && !reduceMotion ? "transition-[transform,width] motion-travel motion-reduce:transition-none group-data-[reduce=true]:transition-none" : "transition-none",
                    )}
                    style={{ width: indicator.width, transform: `translateX(${indicator.x}px)` }}
                />
                {items.map((item) => {
                    const active = item.value === selected?.value;
                    return (
                        <button
                            key={item.value}
                            type="button"
                            role="tab"
                            data-value={item.value}
                            aria-selected={active}
                            onClick={() => setValue(item.value)}
                            className={cx(
                                "px-spacing-03 py-spacing-02 text-sm transition-colors motion-feedback motion-reduce:transition-none group-data-[reduce=true]:transition-none",
                                active ? "font-medium text-ink" : "text-muted",
                            )}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>
            <div key={selected?.value} className="animate-motion-fade text-sm text-ink motion-reduce:animate-none group-data-[reduce=true]:animate-none">
                {selected?.content}
            </div>
        </div>
    );
}
