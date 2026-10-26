import type { ReactNode } from "react";
import { Divider } from "../layout/divider";
import { Layout } from "../layout/layout";

export type ShellProps = {
    product: ReactNode;
    navigation: ReactNode;
    settings: ReactNode;
    header: ReactNode;
    help: ReactNode;
    user: ReactNode;
    children: ReactNode;
};

export function Shell({ product, navigation, settings, header, help, user, children }: ShellProps) {
    return (
        <Layout
            siderPlacement="full-height"
            sider={
                <div className="flex h-full flex-col gap-spacing-04">
                    {product}
                    {navigation}
                    <div className="mt-auto flex flex-col gap-spacing-03">
                        <Divider />
                        {settings}
                    </div>
                </div>
            }
            header={
                <div className="flex w-full items-start gap-spacing-03">
                    <div className="min-w-0 flex-1">{header}</div>
                    {help || user ? (
                        <div className="ml-auto flex items-center gap-spacing-03">
                            {help}
                            {user}
                        </div>
                    ) : null}
                </div>
            }
        >
            {children}
        </Layout>
    );
}
