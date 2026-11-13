import type { ReactNode } from "react";
import { Button } from "../base/button";
import { Shell } from "../modules/shell";
import { ShellBar } from "../modules/shell-actions";
import { Menu } from "../navigation/menu";

const domains = [
    { value: "projects", label: "Projects" },
    { value: "members", label: "Members" },
    { value: "billing", label: "Billing" },
] as const;

/** Minimal Shell chrome for pattern DocPage demos. Navigation is decorative unless controlled. */
export function PatternDemoFrame({
    title,
    helpTitle = "Help",
    helpBody = "The shell stays while the page inside changes.",
    domain = "projects",
    children,
}: {
    title: string;
    helpTitle?: string;
    helpBody?: string;
    domain?: (typeof domains)[number]["value"];
    children: ReactNode;
}) {
    return (
        <Shell
            product={<span className="px-spacing-04 font-semibold text-ink">North</span>}
            navigation={<Menu items={domains} defaultValue={domain} />}
            settings={
                <Button variant="ghost" className="justify-start">
                    Settings
                </Button>
            }
            header={<ShellBar title={title} helpTitle={helpTitle} helpBody={helpBody} name="Alex Kim" />}
            help={null}
            user={null}
        >
            {children}
        </Shell>
    );
}
