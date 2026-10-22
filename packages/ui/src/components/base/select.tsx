import type { ReactNode, SelectHTMLAttributes } from "react";
import { useId } from "react";
import { cx } from "../../utils/cx";
import { type Density, useDensity } from "./density";
import { Field, fieldDescribedBy } from "./field";

export type SelectOption = {
    value: string;
    label: string;
};

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
    label: string;
    options: readonly SelectOption[];
    hint?: ReactNode;
    error?: ReactNode;
    required?: boolean;
    density?: Density;
    layout?: "stacked" | "horizontal";
};

const selectClass: Record<Density, string> = {
    dense: "h-spacing-06 w-full appearance-none rounded-md bg-surface px-spacing-03 pr-spacing-06 text-xs text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
    standard: "h-spacing-07 w-full appearance-none rounded-md bg-surface px-spacing-03 pr-spacing-07 text-sm text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
    wide: "h-spacing-08 w-full appearance-none rounded-md bg-surface px-spacing-04 pr-spacing-08 text-sm text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
};

const chevronClass: Record<Density, string> = {
    dense: "pointer-events-none absolute top-1/2 right-spacing-02 size-spacing-03 -translate-y-1/2 text-muted",
    standard: "pointer-events-none absolute top-1/2 right-spacing-03 size-spacing-04 -translate-y-1/2 text-muted",
    wide: "pointer-events-none absolute top-1/2 right-spacing-03 size-spacing-04 -translate-y-1/2 text-muted",
};

export function Select({ label, options, hint, error, required, density, layout = "stacked", id, className, ...props }: SelectProps) {
    const resolved = useDensity(density);
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    return (
        <Field label={label} hint={hint} error={error} required={required} htmlFor={fieldId} layout={layout} density={resolved} className={className}>
            <span className="relative block min-w-0">
                <select
                    className={cx(selectClass[resolved], error ? "border border-danger" : "border border-line")}
                    {...props}
                    id={fieldId}
                    aria-describedby={fieldDescribedBy(fieldId, hint, error)}
                    aria-invalid={error ? true : undefined}
                    required={required || undefined}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <svg viewBox="0 0 16 16" aria-hidden="true" className={chevronClass[resolved]}>
                    <path d="M4 6.5 8 10.5 12 6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </span>
        </Field>
    );
}
