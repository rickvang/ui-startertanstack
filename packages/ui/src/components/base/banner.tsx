import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Button } from "./button";
import type { MessageTone } from "./message";

export type BannerProps = {
    title: string;
    tone?: MessageTone;
    children: ReactNode;
    onDismiss?: () => void;
};

const toneClass: Record<MessageTone, string> = {
    neutral: "border-line bg-canvas text-ink",
    success: "border-line bg-accent-subtle text-ink",
    danger: "border-danger bg-danger-subtle text-ink",
};

export function Banner({ title, tone = "neutral", children, onDismiss }: BannerProps) {
    return (
        <div className={cx("flex w-full flex-col gap-spacing-02 rounded-md border px-spacing-04 py-spacing-03", toneClass[tone])} role={tone === "danger" ? "alert" : "status"}>
            <div className="flex items-start justify-between gap-spacing-03">
                <p className="text-sm font-medium">{title}</p>
                {onDismiss ? (
                    <Button variant="ghost" size="dense" onClick={onDismiss}>
                        Close
                    </Button>
                ) : null}
            </div>
            <div className="text-sm">{children}</div>
        </div>
    );
}
