import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { useId, useState } from "react";
import { cx } from "../../utils/cx";
import { type Density, useDensity } from "./density";
import { Field, fieldDescribedBy } from "./field";

export type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role" | "onClick"> & {
    label: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    hint?: ReactNode;
    error?: ReactNode;
    required?: boolean;
    density?: Density;
    layout?: "inline" | "stacked" | "horizontal";
    ref?: Ref<HTMLButtonElement>;
};

const trackClass: Record<Density, string> = {
    dense: "relative h-spacing-04 w-spacing-06 shrink-0 rounded-full",
    standard: "relative h-spacing-05 w-spacing-07 shrink-0 rounded-full",
    wide: "relative h-spacing-06 w-spacing-08 shrink-0 rounded-full",
};

const thumbClass: Record<Density, string> = {
    dense: "pointer-events-none absolute top-spacing-01 left-spacing-01 size-spacing-03 rounded-full bg-surface transition-transform duration-travel ease-spring motion-reduce:transition-none",
    standard: "pointer-events-none absolute top-spacing-01 left-spacing-01 size-spacing-04 rounded-full bg-surface transition-transform duration-travel ease-spring motion-reduce:transition-none",
    wide: "pointer-events-none absolute top-spacing-02 left-spacing-02 size-spacing-05 rounded-full bg-surface transition-transform duration-travel ease-spring motion-reduce:transition-none",
};

const thumbTravel: Record<Density, string> = {
    dense: "translate-x-spacing-04",
    standard: "translate-x-spacing-05",
    wide: "translate-x-spacing-05",
};

const horizontalControl: Record<Density, string> = {
    dense: "mt-spacing-01 flex h-spacing-05 items-center",
    standard: "mt-spacing-02 flex h-spacing-05.5 items-center",
    wide: "mt-spacing-03 flex h-spacing-05.5 items-center",
};

export function Switch({ label, defaultChecked = false, checked: checkedProp, onCheckedChange, hint, error, required, density, layout = "inline", id, className, ref, ...props }: SwitchProps) {
    const resolved = useDensity(density);
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const [uncontrolled, setUncontrolled] = useState(defaultChecked);
    const checked = checkedProp ?? uncontrolled;

    function toggle() {
        const next = !checked;
        if (checkedProp === undefined) {
            setUncontrolled(next);
        }
        onCheckedChange?.(next);
    }

    const control = (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            className={cx(trackClass[resolved], "transition-colors duration-feedback ease-standard motion-reduce:transition-none", checked ? "bg-accent" : "bg-line")}
            {...props}
            ref={ref}
            id={fieldId}
            aria-describedby={fieldDescribedBy(fieldId, hint, error)}
            aria-invalid={error ? true : undefined}
            onClick={toggle}
        >
            <span className={cx(thumbClass[resolved], checked ? thumbTravel[resolved] : undefined)} />
        </button>
    );

    return (
        <Field label={label} hint={hint} error={error} required={required} htmlFor={fieldId} layout={layout} density={resolved} className={className}>
            {layout === "horizontal" ? <span className={horizontalControl[resolved]}>{control}</span> : control}
        </Field>
    );
}
