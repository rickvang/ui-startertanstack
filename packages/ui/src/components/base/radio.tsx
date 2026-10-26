import type { ReactNode } from "react";
import { useId } from "react";
import { cx } from "../../utils/cx";
import { type Density, useDensity } from "./density";
import { fieldDescribedBy } from "./field";

export type RadioOption = {
    value: string;
    label: string;
};

export type RadioGroupProps = {
    label: string;
    name?: string;
    options: readonly RadioOption[];
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    hint?: ReactNode;
    error?: ReactNode;
    required?: boolean;
    density?: Density;
    layout?: "stacked" | "horizontal";
};

const groupClass: Record<Density, string> = {
    dense: "flex flex-col gap-spacing-02 border-0 p-0",
    standard: "flex flex-col gap-spacing-02 border-0 p-0",
    wide: "flex flex-col gap-spacing-03 border-0 p-0",
};

const legendClass: Record<Density, string> = {
    dense: "text-xs font-medium text-ink",
    standard: "text-sm font-medium text-ink",
    wide: "text-sm font-medium text-ink",
};

const optionClass: Record<Density, string> = {
    dense: "inline-flex items-center gap-spacing-02 text-xs text-ink",
    standard: "inline-flex items-center gap-spacing-03 text-sm text-ink",
    wide: "inline-flex items-center gap-spacing-03 text-sm text-ink",
};

const controlSize: Record<Density, string> = {
    dense: "size-spacing-04",
    standard: "size-spacing-05",
    wide: "size-spacing-05",
};

const dotClass: Record<Density, string> = {
    dense: "pointer-events-none absolute inset-spacing-01 rounded-full bg-accent opacity-0 peer-checked:opacity-100",
    standard: "pointer-events-none absolute inset-spacing-02 rounded-full bg-accent opacity-0 peer-checked:opacity-100",
    wide: "pointer-events-none absolute inset-spacing-02 rounded-full bg-accent opacity-0 peer-checked:opacity-100",
};

const hintClass: Record<Density, string> = {
    dense: "text-xs text-muted",
    standard: "text-xs text-muted",
    wide: "text-sm text-muted",
};

const errorClass: Record<Density, string> = {
    dense: "text-xs text-danger",
    standard: "text-xs text-danger",
    wide: "text-sm text-danger",
};

const horizontalGroup: Record<Density, string> = {
    dense: "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-spacing-03 gap-y-spacing-01 border-0 p-0",
    standard: "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-spacing-04 gap-y-spacing-02 border-0 p-0",
    wide: "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-spacing-04 gap-y-spacing-03 border-0 p-0",
};

const horizontalLegend: Record<Density, string> = {
    dense: "w-spacing-12 shrink-0 pt-spacing-01 text-xs font-medium wrap-break-word text-ink",
    standard: "w-spacing-13 shrink-0 pt-spacing-02 text-sm font-medium wrap-break-word text-ink",
    wide: "w-spacing-13 shrink-0 pt-spacing-03 text-sm font-medium wrap-break-word text-ink",
};

const horizontalOptions: Record<Density, string> = {
    dense: "mt-spacing-01",
    standard: "mt-spacing-02",
    wide: "mt-spacing-03",
};

export function RadioGroup({ label, name, options, defaultValue, value, onValueChange, className, hint, error, required, density, layout = "stacked" }: RadioGroupProps) {
    const resolved = useDensity(density);
    const generatedId = useId();
    const groupName = name ?? generatedId;
    const hintId = hint ? `${groupName}-hint` : undefined;
    const errorId = error ? `${groupName}-error` : undefined;
    const labelText = (
        <>
            {label}
            {required ? (
                <span className="text-danger" aria-hidden="true">
                    {" "}
                    *
                </span>
            ) : null}
        </>
    );
    const messages = (
        <>
            {hint ? (
                <p id={hintId} className={hintClass[resolved]}>
                    {hint}
                </p>
            ) : null}
            {error ? (
                <p id={errorId} role="alert" className={errorClass[resolved]}>
                    {error}
                </p>
            ) : null}
        </>
    );
    const optionList = (
        <div className={cx(groupClass[resolved], layout === "horizontal" ? horizontalOptions[resolved] : undefined)}>
            {options.map((option) => (
                <label key={option.value} className={optionClass[resolved]}>
                    <span className={cx("relative inline-flex shrink-0", controlSize[resolved])}>
                        <input
                            type="radio"
                            name={groupName}
                            value={option.value}
                            checked={value === undefined ? undefined : option.value === value}
                            defaultChecked={value === undefined && option.value === defaultValue ? true : undefined}
                            required={required || undefined}
                            onChange={() => onValueChange?.(option.value)}
                            className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
                        />
                        <span aria-hidden="true" className={cx("pointer-events-none absolute inset-0 rounded-full border bg-surface peer-checked:border-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-spacing-01 peer-focus-visible:outline-focus peer-disabled:opacity-50", error ? "border-danger" : "border-line")} />
                        <span aria-hidden="true" className={dotClass[resolved]} />
                    </span>
                    {option.label}
                </label>
            ))}
        </div>
    );

    switch (layout) {
        case "stacked":
            return (
                <fieldset aria-describedby={fieldDescribedBy(groupName, hint, error)} aria-invalid={error ? true : undefined} className={cx(groupClass[resolved], className)}>
                    <legend className={legendClass[resolved]}>{labelText}</legend>
                    {optionList}
                    {hint || error ? messages : null}
                </fieldset>
            );
        case "horizontal":
            return (
                <div className={cx(horizontalGroup[resolved], className)}>
                    <span id={`${groupName}-label`} className={horizontalLegend[resolved]}>
                        {labelText}
                    </span>
                    <fieldset aria-labelledby={`${groupName}-label`} aria-describedby={fieldDescribedBy(groupName, hint, error)} aria-invalid={error ? true : undefined} className="min-w-0 border-0 p-0">
                        {optionList}
                    </fieldset>
                    {hint || error ? <div className="col-start-2">{messages}</div> : null}
                </div>
            );
        default: {
            const exhaustive: never = layout;
            return exhaustive;
        }
    }
}
