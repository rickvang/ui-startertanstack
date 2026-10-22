import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

type SiderPlacement = "under-header" | "full-height";

export type LayoutProps = {
    header?: ReactNode;
    sider?: ReactNode;
    footer?: ReactNode;
    siderPlacement?: SiderPlacement;
    children: ReactNode;
    className?: string;
};

const region = "text-sm text-ink";

function Sider({ children }: { children: ReactNode }) {
    return <aside className={cx("w-spacing-13 shrink-0 border-r border-line bg-surface p-spacing-03", region)}>{children}</aside>;
}

function Header({ children }: { children: ReactNode }) {
    return <header className={cx("border-b border-line bg-surface px-spacing-05 py-spacing-03 font-medium", region)}>{children}</header>;
}

function Footer({ children }: { children: ReactNode }) {
    return <footer className={cx("border-t border-line bg-surface px-spacing-05 py-spacing-03", region)}>{children}</footer>;
}

export function Layout({ header, sider, footer, siderPlacement = "under-header", children, className }: LayoutProps) {
    const content = <main className="min-w-0 flex-1 p-spacing-04 text-sm text-muted">{children}</main>;
    const siderNode = sider ? <Sider>{sider}</Sider> : null;
    const headerNode = header ? <Header>{header}</Header> : null;

    return (
        <div className={cx("flex w-full flex-col overflow-hidden rounded-md border border-line bg-canvas", className)}>
            <Frame header={headerNode} sider={siderNode} content={content} placement={siderPlacement} />
            {footer ? <Footer>{footer}</Footer> : null}
        </div>
    );
}

function Frame({
    header,
    sider,
    content,
    placement,
}: {
    header: ReactNode;
    sider: ReactNode;
    content: ReactNode;
    placement: SiderPlacement;
}) {
    switch (placement) {
        case "under-header":
            return (
                <div className="flex min-h-spacing-11 flex-col">
                    {header}
                    <div className="flex min-h-spacing-10 flex-1">
                        {sider}
                        {content}
                    </div>
                </div>
            );
        case "full-height":
            return (
                <div className="flex min-h-spacing-11">
                    {sider}
                    <div className="flex min-w-0 flex-1 flex-col">
                        {header}
                        {content}
                    </div>
                </div>
            );
        default: {
            const exhaustive: never = placement;
            return exhaustive;
        }
    }
}
