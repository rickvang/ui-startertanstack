import type { ReactNode } from "react";

export function LayoutPurpose({ children }: { children: ReactNode }) {
    return <p className="mb-spacing-05 max-w-2xl text-sm text-muted">{children}</p>;
}
