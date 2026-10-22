import type { ReactNode } from "react";
import { Divider } from "../layout/divider";

export type DetailGroupProps = {
    title: string;
    children: ReactNode;
    divider?: boolean;
};

export function DetailGroup({ title, children, divider = false }: DetailGroupProps) {
    return (
        <section className="flex flex-col gap-spacing-04">
            {divider ? <Divider /> : null}
            <h3 className="text-sm font-semibold text-ink">{title}</h3>
            {children}
        </section>
    );
}
