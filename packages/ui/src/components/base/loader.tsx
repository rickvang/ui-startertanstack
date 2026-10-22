import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

export type LoaderVariant = "record" | "text" | "media" | "circle";

const eight =
    "M24 40 L28.1 36.6 L32 33.3 L35.3 30.1 L37.9 27 L39.5 24.2 L40 21.6 L39.5 19.4 L37.9 17.5 L35.3 16 L32 14.9 L28.1 14.2 L24 14 L19.9 14.2 L16 14.9 L12.7 16 L10.1 17.5 L8.5 19.4 L8 21.6 L8.5 24.2 L10.1 27 L12.7 30.1 L16 33.3 L19.9 36.6 L24 40 L28.1 43.4 L32 46.7 L35.3 49.9 L37.9 53 L39.5 55.8 L40 58.4 L39.5 60.6 L37.9 62.5 L35.3 64 L32 65.1 L28.1 65.8 L24 66 L19.9 65.8 L16 65.1 L12.7 64 L10.1 62.5 L8.5 60.6 L8 58.4 L8.5 55.8 L10.1 53 L12.7 49.9 L16 46.7 L19.9 43.4 L24 40";

function Circle() {
    return (
        <span className="relative inline-block h-spacing-11 w-spacing-09">
            <svg viewBox="0 0 48 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <path d={eight} fill="none" stroke="var(--line)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span
                className="absolute top-0 left-0 size-spacing-03 rounded-full bg-accent animate-eight motion-reduce:animate-none"
                style={{ offsetPath: `path('${eight}')`, offsetRotate: "0deg" }}
            />
        </span>
    );
}

export type LoaderProps = HTMLAttributes<HTMLSpanElement> & {
    label?: string;
    variant?: LoaderVariant;
};

function Lines() {
    return (
        <span className="flex flex-col gap-spacing-03">
            <span className="h-spacing-03 w-spacing-12 rounded-full bg-selected" />
            <span className="h-spacing-03 w-spacing-13 rounded-full bg-selected" />
            <span className="h-spacing-03 w-spacing-10 rounded-full bg-selected" />
        </span>
    );
}

function shape(variant: LoaderVariant): ReactNode {
    switch (variant) {
        case "record":
            return (
                <>
                    <span className="size-spacing-08 shrink-0 rounded-full bg-selected" />
                    <Lines />
                </>
            );
        case "text":
            return <Lines />;
        case "media":
            return (
                <span className="flex flex-col gap-spacing-03">
                    <span className="h-spacing-11 w-spacing-13 rounded-md bg-selected" />
                    <span className="h-spacing-03 w-spacing-12 rounded-full bg-selected" />
                    <span className="h-spacing-03 w-spacing-10 rounded-full bg-selected" />
                </span>
            );
        case "circle":
            return <Circle />;
        default: {
            const exhaustive: never = variant;
            return exhaustive;
        }
    }
}

export function Loader({ label = "Loading", variant = "record", className, ...props }: LoaderProps) {
    return (
        <span
            role="status"
            aria-label={label}
            className={cx("inline-flex items-center gap-spacing-04", variant === "circle" ? undefined : "animate-loader motion-reduce:animate-none", className)}
            {...props}
        >
            {shape(variant)}
        </span>
    );
}
