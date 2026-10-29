import { useId, useState, type ReactNode } from "react";

export type TooltipProps = {
    label: string;
    children: ReactNode;
};

export function Tooltip({ label, children }: TooltipProps) {
    const tooltipId = useId();
    const [shown, setShown] = useState(false);

    return (
        <span
            className="relative inline-flex"
            onMouseEnter={() => setShown(true)}
            onMouseLeave={() => setShown(false)}
            onFocus={() => setShown(true)}
            onBlur={() => setShown(false)}
        >
            <span className="inline-flex" aria-describedby={shown ? tooltipId : undefined}>
                {children}
            </span>
            {shown ? (
                <span
                    id={tooltipId}
                    role="tooltip"
                    className="absolute bottom-full left-1/2 z-30 mb-spacing-02 w-max max-w-xs -translate-x-1/2 rounded-md bg-ink px-spacing-03 py-spacing-02 text-xs text-canvas"
                >
                    {label}
                </span>
            ) : null}
        </span>
    );
}
