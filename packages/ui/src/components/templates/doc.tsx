import type { ReactNode } from "react";

export function DocPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
    return (
        <div className="flex max-w-3xl flex-col gap-spacing-07 p-spacing-06 text-ink">
            <header className="flex flex-col gap-spacing-03">
                <h1 className="text-display-sm font-semibold">{title}</h1>
                <p className="text-md text-muted">{intro}</p>
            </header>
            {children}
        </div>
    );
}

export function DocSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-spacing-04">
            <h2 className="text-lg font-semibold">{title}</h2>
            {children}
        </section>
    );
}

export function DocList({ items }: { items: readonly { title: string; body: string }[] }) {
    return (
        <div className="flex flex-col gap-spacing-05">
            {items.map((item) => (
                <div key={item.title} className="flex flex-col gap-spacing-02">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="text-sm text-muted">{item.body}</p>
                </div>
            ))}
        </div>
    );
}
