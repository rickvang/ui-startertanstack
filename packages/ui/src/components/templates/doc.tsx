import type { ReactNode } from "react";
import { FoundationPage, FoundationSection } from "../foundations/catalog";
import { cx } from "../../utils/cx";

export function DocPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
    return (
        <FoundationPage title={title} intro={intro}>
            {children}
        </FoundationPage>
    );
}

export const DocSection = FoundationSection;

export function DocList({
    items,
    columns = 2,
}: {
    items: readonly { title: string; body: string }[];
    columns?: 1 | 2 | 3;
}) {
    const gridClass =
        columns === 1
            ? "flex flex-col gap-spacing-04"
            : columns === 3
              ? "grid gap-spacing-04 md:grid-cols-2 xl:grid-cols-3"
              : "grid gap-spacing-04 md:grid-cols-2";

    return (
        <div className={gridClass}>
            {items.map((item) => (
                <article key={item.title} className="flex flex-col gap-spacing-02 rounded-lg border border-line bg-surface p-spacing-05">
                    <h3 className="text-sm font-medium text-ink">{item.title}</h3>
                    <p className="text-sm text-muted">{item.body}</p>
                </article>
            ))}
        </div>
    );
}

export function DocWhenAvoid({ when, avoid }: { when?: string; avoid?: string }) {
    if (!when && !avoid) {
        return null;
    }

    return (
        <div className="flex max-w-3xl flex-col gap-spacing-03 rounded-lg border border-line bg-canvas px-spacing-05 py-spacing-04 text-sm text-muted">
            {when ? <p>{when}</p> : null}
            {when && avoid ? <div className="border-t border-line" /> : null}
            {avoid ? <p>{avoid}</p> : null}
        </div>
    );
}

export function DocDemo({ children, className, bleed }: { children: ReactNode; className?: string; bleed?: boolean }) {
    return (
        <div
            className={cx(
                "overflow-hidden rounded-lg border border-line bg-surface",
                bleed ? "p-0" : "p-spacing-05",
                className,
            )}
        >
            {children}
        </div>
    );
}

export function DocNote({ children }: { children: ReactNode }) {
    return <p className="max-w-3xl text-sm text-muted">{children}</p>;
}
