import type { ReactNode } from "react";
import { useId } from "react";
import { cx } from "../../utils/cx";
import { type Density, useDensity } from "./density";

export function fieldDescribedBy(id: string, hint?: ReactNode, error?: ReactNode) {
    const ids = [hint ? `${id}-hint` : undefined, error ? `${id}-error` : undefined].filter((value): value is string => value !== undefined);
    return ids.length > 0 ? ids.join(" ") : undefined;
}

type FieldLayout = "stacked" | "horizontal" | "inline";

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

const labelClass: Record<Density, string> = {
    dense: "text-xs font-medium text-ink",
    standard: "text-sm font-medium text-ink",
    wide: "text-sm font-medium text-ink",
};

const stackedClass: Record<Density, string> = {
    dense: "flex flex-col gap-spacing-01",
    standard: "flex flex-col gap-spacing-02",
    wide: "flex flex-col gap-spacing-03",
};

const inlineWrapClass: Record<Density, string> = {
    dense: "flex flex-col gap-spacing-01",
    standard: "flex flex-col gap-spacing-02",
    wide: "flex flex-col gap-spacing-03",
};

const inlineLabelClass: Record<Density, string> = {
    dense: "inline-flex items-center gap-spacing-02 text-xs text-ink",
    standard: "inline-flex items-center gap-spacing-03 text-sm text-ink",
    wide: "inline-flex items-center gap-spacing-03 text-sm text-ink",
};

const horizontalClass: Record<Density, string> = {
    dense: "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-spacing-03 gap-y-spacing-01",
    standard: "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-spacing-04 gap-y-spacing-02",
    wide: "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-spacing-04 gap-y-spacing-03",
};

const horizontalLabelClass: Record<Density, string> = {
    dense: "w-spacing-12 shrink-0 pt-spacing-01 text-xs font-medium wrap-break-word text-ink",
    standard: "w-spacing-13 shrink-0 pt-spacing-02 text-sm font-medium wrap-break-word text-ink",
    wide: "w-spacing-13 shrink-0 pt-spacing-03 text-sm font-medium wrap-break-word text-ink",
};

export type FieldProps = {
    label: string;
    hint?: ReactNode;
    error?: ReactNode;
    required?: boolean;
    htmlFor?: string;
    layout?: FieldLayout;
    density?: Density;
    className?: string;
    children: ReactNode;
};

export function Field({ label, hint, error, required, htmlFor, layout = "stacked", density, className, children }: FieldProps) {
    const resolved = useDensity(density);
    const generatedId = useId();
    const fieldId = htmlFor ?? generatedId;
    const hintId = hint ? `${fieldId}-hint` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    const requiredMark = required ? (
        <span className="text-danger" aria-hidden="true">
            {" "}
            *
        </span>
    ) : null;
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

    switch (layout) {
        case "inline":
            return (
                <div className={cx(inlineWrapClass[resolved], className)}>
                    <label className={inlineLabelClass[resolved]}>
                        {children}
                        <span className="font-medium">
                            {label}
                            {requiredMark}
                        </span>
                    </label>
                    {messages}
                </div>
            );
        case "horizontal":
            return (
                <div className={cx(horizontalClass[resolved], className)}>
                    <label htmlFor={fieldId} className={horizontalLabelClass[resolved]}>
                        {label}
                        {requiredMark}
                    </label>
                    {children}
                    {hint || error ? <div className={cx("col-start-2", stackedClass[resolved])}>{messages}</div> : null}
                </div>
            );
        case "stacked":
            return (
                <div className={cx(stackedClass[resolved], className)}>
                    <label htmlFor={fieldId} className={labelClass[resolved]}>
                        {label}
                        {requiredMark}
                    </label>
                    {children}
                    {messages}
                </div>
            );
        default: {
            const exhaustive: never = layout;
            return exhaustive;
        }
    }
}
