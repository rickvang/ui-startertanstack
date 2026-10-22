import type { ReactNode, TextareaHTMLAttributes } from "react";
import { useId } from "react";
import { cx } from "../../utils/cx";
import { type Density, useDensity } from "./density";
import { Field, fieldDescribedBy } from "./field";

type TextAreaLayout = "stacked" | "horizontal";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    hint?: ReactNode;
    error?: ReactNode;
    required?: boolean;
    layout?: TextAreaLayout;
    density?: Density;
};

const areaClass: Record<Density, string> = {
    dense: "w-full min-w-0 rounded-md bg-surface px-spacing-03 py-spacing-01 text-xs text-ink outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
    standard: "w-full min-w-0 rounded-md bg-surface px-spacing-03 py-spacing-02 text-sm text-ink outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
    wide: "w-full min-w-0 rounded-md bg-surface px-spacing-04 py-spacing-03 text-sm text-ink outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
};

export function TextArea({ label, hint, error, required, layout = "stacked", density, id, className, ...props }: TextAreaProps) {
    const resolved = useDensity(density);
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    return (
        <Field label={label} hint={hint} error={error} required={required} htmlFor={fieldId} layout={layout} density={resolved} className={className}>
            <textarea
                rows={4}
                className={cx(areaClass[resolved], error ? "border border-danger" : "border border-line")}
                {...props}
                id={fieldId}
                aria-describedby={fieldDescribedBy(fieldId, hint, error)}
                aria-invalid={error ? true : undefined}
                required={required || undefined}
            />
        </Field>
    );
}
