import type { ReactNode } from "react";

export function ExamplePage({ intro, children }: { intro: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-spacing-08">
            <p className="max-w-2xl text-md text-muted">{intro}</p>
            {children}
        </div>
    );
}

export function ExampleGroup({ title, purpose, children }: { title: string; purpose: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-spacing-06 border-t border-line pt-spacing-06">
            <div className="flex flex-col gap-spacing-02">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="max-w-2xl text-sm text-muted">{purpose}</p>
            </div>
            <div className="flex flex-col gap-spacing-07">{children}</div>
        </section>
    );
}

export function ExampleSpecimen({ name, uses, children }: { name: string; uses: ReadonlyArray<readonly [string, string]>; children: ReactNode }) {
    return (
        <article className="grid items-start gap-spacing-05 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="flex min-w-0 flex-col gap-spacing-03">
                <h3 className="text-sm font-medium text-ink">{name}</h3>
                <div className="rounded-lg border border-line bg-canvas p-spacing-05">{children}</div>
            </div>
            <div className="flex flex-col gap-spacing-03">
                <p className="text-xs font-medium text-muted">Uses</p>
                <ul className="flex flex-col gap-spacing-03">
                    {uses.map(([role, token]) => (
                        <li key={role} className="flex flex-col gap-spacing-01">
                            <span className="text-sm text-ink">{role}</span>
                            <span className="font-mono text-xs text-muted">{token}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
