import { cx } from "../../utils/cx";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

export type BreadcrumbProps = {
    items: readonly BreadcrumbItem[];
    className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={cx("flex flex-wrap items-center gap-spacing-02 text-sm", className)}>
            {items.map((item, index) => {
                const current = index === items.length - 1;
                return (
                    <span key={item.label} className="inline-flex items-center gap-spacing-02">
                        {index > 0 ? <span className="text-muted">/</span> : null}
                        {current || item.href === undefined ? (
                            <span className={current ? "font-medium text-ink" : "text-muted"}>{item.label}</span>
                        ) : (
                            <a href={item.href} className="text-muted">
                                {item.label}
                            </a>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}
