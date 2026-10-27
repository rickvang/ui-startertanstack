import type { ReactNode } from "react";
import { Divider } from "../layout/divider";
import { Layout } from "../layout/layout";

export type ShellFrame = "header-content-footer" | "header-side" | "side-header" | "side-content";

export type ShellProps = {
    frame?: ShellFrame;
    product: ReactNode;
    navigation: ReactNode;
    settings: ReactNode;
    header: ReactNode;
    help: ReactNode;
    user: ReactNode;
    children: ReactNode;
};

export function Shell({ frame = "side-header", product, navigation, settings, header, help, user, children }: ShellProps) {
    switch (frame) {
        case "header-content-footer":
            return (
                <Layout
                    header={
                        <div className="flex w-full flex-wrap items-center gap-spacing-04">
                            {product}
                            <div className="min-w-0 flex-1">{navigation}</div>
                            {user}
                        </div>
                    }
                    footer={
                        <div className="flex flex-wrap items-center gap-spacing-04">
                            {help}
                            {settings}
                        </div>
                    }
                >
                    {children}
                </Layout>
            );
        case "header-side":
            return (
                <Layout
                    siderPlacement="under-header"
                    header={
                        <div className="flex w-full flex-wrap items-center gap-spacing-03">
                            {product}
                            <div className="ml-auto flex items-center gap-spacing-03">
                                {settings}
                                {help}
                                {user}
                            </div>
                        </div>
                    }
                    sider={navigation}
                >
                    {header}
                    {children}
                </Layout>
            );
        case "side-header":
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
        case "side-content":
            return (
                <Layout
                    sider={
                        <div className="flex h-full flex-col gap-spacing-04">
                            {navigation}
                            <div className="mt-auto flex flex-col gap-spacing-03">
                                {help}
                                {user}
                            </div>
                        </div>
                    }
                >
                    {children}
                </Layout>
            );
        default: {
            const exhaustive: never = frame;
            return exhaustive;
        }
    }
}
