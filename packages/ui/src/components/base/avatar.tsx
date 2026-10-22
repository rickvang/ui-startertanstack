import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
    name: string;
};

export function Avatar({ name, className, ...props }: AvatarProps) {
    const initials = name
        .split(" ")
        .filter((part) => part.length > 0)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");

    return (
        <span
            className={cx(
                "inline-flex size-spacing-07 shrink-0 items-center justify-center rounded-full bg-selected text-xs font-medium text-ink",
                className,
            )}
            {...props}
        >
            {initials}
        </span>
    );
}
