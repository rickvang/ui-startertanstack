import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export type DividerProps = HTMLAttributes<HTMLHRElement>;

export function Divider({ className, ...props }: DividerProps) {
    return <hr className={cx("w-full border-0 border-t border-line", className)} {...props} />;
}
