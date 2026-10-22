import type { ReactNode } from "react";
import { useId } from "react";
import { cx } from "../../utils/cx";
import { type Density, DensityProvider, useDensity } from "./density";

const fieldsetClass: Record<Density, string> = {
    dense: "m-0 flex min-w-0 flex-col gap-spacing-03 rounded-md border border-line bg-surface p-spacing-03",
    standard: "m-0 flex min-w-0 flex-col gap-spacing-04 rounded-md border border-line bg-surface p-spacing-04",
    wide: "m-0 flex min-w-0 flex-col gap-spacing-05 rounded-md border border-line bg-surface p-spacing-05.5",
};

const legendClass: Record<Density, string> = {
    dense: "float-left mb-spacing-03 w-full text-xs font-semibold text-ink",
    standard: "float-left mb-spacing-04 w-full text-sm font-semibold text-ink",
    wide: "float-left mb-spacing-05 w-full text-lg font-semibold text-ink",
};

const fieldsClass: Record<Density, string> = {
    dense: "flex clear-left flex-col gap-spacing-03",
    standard: "flex clear-left flex-col gap-spacing-04",
    wide: "flex clear-left flex-col gap-spacing-05",
};

const errorClass: Record<Density, string> = {
    dense: "text-xs text-danger",
    standard: "text-xs text-danger",
    wide: "text-sm text-danger",
};

export type FieldsetProps = {
    title: string;
    error?: ReactNode;
    density?: Density;
    children: ReactNode;
    className?: string;
};

export function Fieldset({ title, error, density, children, className }: FieldsetProps) {
    const resolved = useDensity(density);
    const generatedId = useId();
    const errorId = error ? `${generatedId}-error` : undefined;

    return (
        <DensityProvider density={resolved}>
            <fieldset aria-describedby={errorId} className={cx(fieldsetClass[resolved], className)}>
                <legend className={legendClass[resolved]}>{title}</legend>
                <div className={fieldsClass[resolved]}>{children}</div>
                {error ? (
                    <p id={errorId} role="alert" className={errorClass[resolved]}>
                        {error}
                    </p>
                ) : null}
            </fieldset>
        </DensityProvider>
    );
}
