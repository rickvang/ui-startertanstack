import type { ReactNode } from "react";
import { Fragment } from "react";
import { cx } from "../../utils/cx";

export type DescriptionItem = {
    label: string;
    value: ReactNode;
};

export type DescriptionLayout = "stacked" | "horizontal";

export type DescriptionAlign = "start" | "end";

export type DescriptionListProps = {
    items: readonly DescriptionItem[];
    layout?: DescriptionLayout;
    align?: DescriptionAlign;
    className?: string;
};

const listClass: Record<DescriptionLayout, string> = {
    stacked: "grid grid-cols-2 gap-x-spacing-04 gap-y-spacing-04 text-sm",
    horizontal: "grid w-full grid-cols-[var(--spacing-spacing-13)_minmax(0,1fr)] items-start gap-x-spacing-04 gap-y-spacing-04 text-sm",
};

const labelClass: Record<DescriptionLayout, string> = {
    stacked: "font-medium text-muted",
    horizontal: "min-w-0 font-medium wrap-break-word text-muted",
};

const valueClass: Record<DescriptionAlign, string> = {
    start: "min-w-0 text-ink",
    end: "min-w-0 justify-self-end text-right text-ink",
};

export function DescriptionList({ items, layout = "stacked", align = "end", className }: DescriptionListProps) {
    switch (layout) {
        case "stacked":
            return (
                <dl className={cx(listClass.stacked, className)}>
                    {items.map((item) => (
                        <div key={item.label}>
                            <dt className={labelClass.stacked}>{item.label}</dt>
                            <dd className="text-ink">{item.value}</dd>
                        </div>
                    ))}
                </dl>
            );
        case "horizontal":
            return (
                <dl className={cx(listClass.horizontal, className)}>
                    {items.map((item) => (
                        <Fragment key={item.label}>
                            <dt className={labelClass.horizontal}>{item.label}</dt>
                            <dd className={valueClass[align]}>{item.value}</dd>
                        </Fragment>
                    ))}
                </dl>
            );
        default: {
            const exhaustive: never = layout;
            return exhaustive;
        }
    }
}
