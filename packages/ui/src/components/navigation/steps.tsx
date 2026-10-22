import { cx } from "../../utils/cx";

export type StepsProps = {
    items: readonly string[];
    current?: number;
    className?: string;
};

export function Steps({ items, current = 0, className }: StepsProps) {
    return (
        <ol className={cx("flex flex-wrap items-center gap-spacing-04", className)}>
            {items.map((item, index) => (
                <li key={item} className={cx("text-sm", index === current ? "font-medium text-ink" : "text-muted")}>
                    {index + 1}. {item}
                </li>
            ))}
        </ol>
    );
}
