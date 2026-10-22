import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cx } from "../../utils/cx";
import { type Density, useDensity } from "./density";
import { Field, fieldDescribedBy } from "./field";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
    label: string;
    hint?: ReactNode;
    error?: ReactNode;
    required?: boolean;
    density?: Density;
    layout?: "inline" | "stacked" | "horizontal";
};

const controlSize: Record<Density, string> = {
    dense: "size-spacing-04",
    standard: "size-spacing-05",
    wide: "size-spacing-05",
};

const horizontalControl: Record<Density, string> = {
    dense: "mt-spacing-01 flex h-spacing-05 items-center",
    standard: "mt-spacing-02 flex h-spacing-05.5 items-center",
    wide: "mt-spacing-03 flex h-spacing-05.5 items-center",
};

export function Checkbox({ label, hint, error, required, density, layout = "inline", id, className, ...props }: CheckboxProps) {
    const resolved = useDensity(density);
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    const control = (
            <span className={cx("relative inline-flex shrink-0", controlSize[resolved])}>
                <input
                    type="checkbox"
                    className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
                    {...props}
                    id={fieldId}
                    aria-describedby={fieldDescribedBy(fieldId, hint, error)}
                    aria-invalid={error ? true : undefined}
                    required={required || undefined}
                />
                <span
                    aria-hidden="true"
                    className={cx(
                        "pointer-events-none absolute inset-0 rounded-xs border bg-surface peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-spacing-01 peer-focus-visible:outline-focus peer-disabled:opacity-50",
                        error ? "border-danger" : "border-line",
                    )}
                />
                <svg viewBox="0 0 16 16" aria-hidden="true" className={cx("pointer-events-none absolute inset-0 text-accent-fg opacity-0 peer-checked:opacity-100", controlSize[resolved])}>
                    <path d="M3.5 8.25 6.5 11.25 12.5 4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </span>
    );

    return (
        <Field label={label} hint={hint} error={error} required={required} htmlFor={fieldId} layout={layout} density={resolved} className={className}>
            {layout === "horizontal" ? <span className={horizontalControl[resolved]}>{control}</span> : control}
        </Field>
    );
}
