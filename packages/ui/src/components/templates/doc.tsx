import { useState, type ReactNode } from "react";
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

export function DocParagraph({ children }: { children: ReactNode }) {
    return <p className="max-w-3xl text-sm text-ink">{children}</p>;
}

export function DocBullets({ items }: { items: readonly string[] }) {
    return (
        <ul className="flex max-w-3xl list-disc flex-col gap-spacing-02 pl-spacing-05 text-sm text-ink">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

export function DocRows({
    headers,
    rows,
}: {
    headers: readonly [string, string];
    rows: readonly { label: string; detail: string }[];
}) {
    return (
        <div className="max-w-3xl overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
                <thead>
                    <tr className="border-b border-line text-ink">
                        <th scope="col" className="py-spacing-03 pr-spacing-05 font-medium whitespace-nowrap">
                            {headers[0]}
                        </th>
                        <th scope="col" className="py-spacing-03 font-medium">
                            {headers[1]}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.label} className="border-b border-line">
                            <th scope="row" className="py-spacing-03 pr-spacing-05 align-top font-medium whitespace-nowrap text-ink">
                                {row.label}
                            </th>
                            <td className="py-spacing-03 align-top text-muted">{row.detail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function DocCodeNote({ children }: { children: string }) {
    const parts = children.split(/(\*\*[^*]+\*\*)/g);

    return (
        <p className="max-w-3xl text-sm text-muted">
            {parts.map((part, index) =>
                part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={index} className="font-medium text-ink">
                        {part.slice(2, -2)}
                    </strong>
                ) : (
                    <span key={index}>{part}</span>
                ),
            )}
        </p>
    );
}

export function DocCodeExample({ note, code }: { note: string; code: string }) {
    const [copied, setCopied] = useState(false);

    async function onCopy() {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    }

    return (
        <div className="flex max-w-3xl flex-col gap-spacing-03">
            <DocCodeNote>{note}</DocCodeNote>
            <details className="overflow-hidden rounded-lg border border-line bg-canvas" open>
                <summary className="cursor-pointer list-none px-spacing-04 py-spacing-03 text-sm font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                    Example code
                </summary>
                <div className="relative border-t border-line">
                    <button
                        type="button"
                        className="absolute top-spacing-03 right-spacing-03 rounded-md border border-line bg-surface px-spacing-03 py-spacing-02 text-xs font-medium text-ink hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                        onClick={onCopy}
                        aria-label={copied ? "Copied" : "Copy code"}
                    >
                        {copied ? "Copied" : "Copy"}
                    </button>
                    <pre className="max-h-[28rem] overflow-auto p-spacing-04 pr-spacing-12 text-xs leading-relaxed text-ink">
                        <code>{code}</code>
                    </pre>
                </div>
            </details>
        </div>
    );
}

export function DocCodeSection({ note, code }: { note: string; code: string }) {
    return (
        <DocSection title="Code example">
            <DocCodeExample note={note} code={code} />
        </DocSection>
    );
}
