import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils/cx";
import { type Density, useDensity } from "./density";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: Density;
    children: ReactNode;
    ref?: Ref<HTMLButtonElement>;
};

const variantClass: Record<ButtonVariant, string> = {
    primary: "bg-accent text-accent-fg hover:bg-accent-hover",
    secondary: "border border-line bg-surface text-ink hover:bg-canvas",
    ghost: "text-ink hover:bg-surface",
    danger: "bg-danger text-accent-fg hover:bg-danger-700",
};

const sizeClass: Record<Density, string> = {
    dense: "h-spacing-06 px-spacing-03 text-xs",
    standard: "h-spacing-07 px-spacing-04 text-sm",
    wide: "h-spacing-08 px-spacing-05 text-sm",
};

export function Button({ variant = "primary", size, type = "button", className, children, ref, ...props }: ButtonProps) {
    const density = useDensity(size);

    return (
        <button
            ref={ref}
            type={type}
            className={cx(
                "inline-flex items-center justify-center gap-spacing-03 rounded-md font-medium transition duration-150 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus",
                variantClass[variant],
                sizeClass[density],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}
