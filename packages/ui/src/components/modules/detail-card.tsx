import type { ReactNode } from "react";
import { Badge } from "../base/badge";
import { Divider } from "../layout/divider";

type StatusVariant = "neutral" | "success" | "warning" | "danger";

export type DetailCardProps = {
    title: string;
    status: string;
    statusVariant?: StatusVariant;
    action?: ReactNode;
    children: ReactNode;
};

export function DetailCard({ title, status, statusVariant = "neutral", action, children }: DetailCardProps) {
    return (
        <section className="flex max-w-xl flex-col gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-05">
            <header className="flex items-center justify-between gap-spacing-03">
                <div className="flex items-center gap-spacing-03">
                    <h2 className="text-sm font-semibold text-ink">{title}</h2>
                    <Badge variant={statusVariant}>{status}</Badge>
                </div>
                {action}
            </header>
            <Divider />
            {children}
        </section>
    );
}
