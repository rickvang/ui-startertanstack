import { cx } from "../../utils/cx";

export type AnchorItem = {
    href: string;
    label: string;
};

export type AnchorProps = {
    items: readonly AnchorItem[];
    className?: string;
};

export function Anchor({ items, className }: AnchorProps) {
    return (
        <nav className={cx("flex flex-col gap-spacing-03", className)}>
            {items.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-ink">
                    {item.label}
                </a>
            ))}
        </nav>
    );
}
