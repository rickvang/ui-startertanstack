import type { FormEvent, ReactNode } from "react";
import { createContext, useContext, useId } from "react";
import { cx } from "../../utils/cx";
import { Button, type ButtonProps } from "./button";
import { type Density, DensityProvider, useDensity } from "./density";

const FormPendingContext = createContext(false);

export function useFormPending() {
    return useContext(FormPendingContext);
}

export type FormProps = {
    children: ReactNode;
    error?: ReactNode;
    pending?: boolean;
    label?: string;
    density?: Density;
    className?: string;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

const formClass: Record<Density, string> = {
    dense: "flex flex-col gap-spacing-03",
    standard: "flex flex-col gap-spacing-04",
    wide: "flex flex-col gap-spacing-05",
};

const summaryClass: Record<Density, string> = {
    dense: "rounded-md border border-danger bg-danger-subtle px-spacing-03 py-spacing-02 text-xs text-danger",
    standard: "rounded-md border border-danger bg-danger-subtle px-spacing-03 py-spacing-02 text-xs text-danger",
    wide: "rounded-md border border-danger bg-danger-subtle px-spacing-04 py-spacing-03 text-sm text-danger",
};

export function Form({ children, error, pending = false, label, density, className, onSubmit }: FormProps) {
    const resolved = useDensity(density);
    const generatedId = useId();
    const errorId = error ? `${generatedId}-error` : undefined;

    return (
        <DensityProvider density={resolved}>
            <FormPendingContext.Provider value={pending}>
                <form
                    aria-label={label}
                    aria-busy={pending || undefined}
                    aria-describedby={errorId}
                    noValidate
                    className={cx(formClass[resolved], className)}
                    onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit?.(event);
                    }}
                >
                    {error ? (
                        <div id={errorId} role="alert" className={summaryClass[resolved]}>
                            {error}
                        </div>
                    ) : null}
                    {children}
                </form>
            </FormPendingContext.Provider>
        </DensityProvider>
    );
}

export function FormSubmit({ disabled, children, ...props }: ButtonProps) {
    const pending = useFormPending();

    return (
        <Button type="submit" disabled={pending || disabled} {...props}>
            {children}
        </Button>
    );
}
