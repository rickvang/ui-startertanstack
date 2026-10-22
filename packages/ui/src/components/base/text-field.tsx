import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cx } from "../../utils/cx";
import { type Density, useDensity } from "./density";
import { Field, fieldDescribedBy } from "./field";

type TextFieldLayout = "stacked" | "horizontal";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    label: string;
    hint?: ReactNode;
    error?: ReactNode;
    required?: boolean;
    layout?: TextFieldLayout;
    density?: Density;
};

const inputClass: Record<Density, string> = {
    dense: "h-spacing-06 w-full min-w-0 rounded-md bg-surface px-spacing-03 text-xs text-ink outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
    standard: "h-spacing-07 w-full min-w-0 rounded-md bg-surface px-spacing-03 text-sm text-ink outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
    wide: "h-spacing-08 w-full min-w-0 rounded-md bg-surface px-spacing-04 text-sm text-ink outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
};

export function TextField({ label, hint, error, required, layout = "stacked", density, id, className, ...props }: TextFieldProps) {
    const resolved = useDensity(density);
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    return (
        <Field label={label} hint={hint} error={error} required={required} htmlFor={fieldId} layout={layout} density={resolved} className={className}>
            <input
                className={cx(inputClass[resolved], error ? "border border-danger" : "border border-line")}
                {...props}
                id={fieldId}
                aria-describedby={fieldDescribedBy(fieldId, hint, error)}
                aria-invalid={error ? true : undefined}
                required={required || undefined}
            />
        </Field>
    );
}
