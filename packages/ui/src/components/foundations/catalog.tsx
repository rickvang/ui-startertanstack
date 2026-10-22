import type { ReactNode } from "react";

export function FoundationPage({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-spacing-08 px-spacing-06 py-spacing-07 text-ink">
            <header className="flex max-w-2xl flex-col gap-spacing-03">
                <h1 className="text-display-sm font-semibold">{title}</h1>
                {intro ? <p className="text-md text-muted">{intro}</p> : null}
            </header>
            {children}
        </div>
    );
}

export function FoundationSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-spacing-05">
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            {children}
        </section>
    );
}
