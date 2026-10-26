import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

export type MessageTone = "neutral" | "success" | "danger";

export type MessageProps = {
    title: string;
    tone?: MessageTone;
    children: ReactNode;
};

const toneClass: Record<MessageTone, string> = {
    neutral: "border-line bg-canvas text-ink",
    success: "border-line bg-accent-subtle text-ink",
    danger: "border-danger bg-danger-subtle text-ink",
};

export function Message({ title, tone = "neutral", children }: MessageProps) {
    return (
        <div className={cx("flex flex-col gap-spacing-02 rounded-md border px-spacing-04 py-spacing-03", toneClass[tone])}>
            <p className="text-sm font-medium">{title}</p>
            <div className="text-sm">{children}</div>
        </div>
    );
}
