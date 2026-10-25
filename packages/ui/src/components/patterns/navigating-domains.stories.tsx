import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../base/avatar";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { Shell } from "../modules/shell";
import { Menu } from "../navigation/menu";
import { DocDemo, DocList, DocPage, DocSection } from "../templates/doc";

const domains = [
    { value: "projects", label: "Projects" },
    { value: "members", label: "Members" },
    { value: "billing", label: "Billing" },
] as const;

type Domain = (typeof domains)[number]["value"];

function isDomain(value: string): value is Domain {
    return value === "projects" || value === "members" || value === "billing";
}

function domainPage(domain: Domain): ReactNode {
    switch (domain) {
        case "projects":
            return (
                <div className="flex max-w-md flex-col items-start gap-spacing-03">
                    <h2 className="text-lg font-semibold text-ink">Studio</h2>
                    <p className="text-sm text-ink">One open project. Invite the people who work on it.</p>
                </div>
            );
        case "members":
            return (
                <div className="flex max-w-md items-center justify-between gap-spacing-03 rounded-sm bg-selected px-spacing-03 py-spacing-02">
                    <span className="font-medium text-ink">Alex Kim</span>
                    <Badge variant="success">Active</Badge>
                </div>
            );
        case "billing":
            return (
                <div className="flex max-w-md flex-col items-start gap-spacing-03">
                    <h2 className="text-lg font-semibold text-ink">Plan</h2>
                    <Badge variant="success">Pro</Badge>
                </div>
            );
        default: {
            const exhaustive: never = domain;
            return exhaustive;
        }
    }
}

const meta = {
    title: "Patterns/Navigating domains",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const NavigatingDomains: Story = {
    name: "Navigating domains",
    render: () => {
        const [domain, setDomain] = useState<Domain>("projects");
        const current = domains.find((item) => item.value === domain)?.label ?? "Projects";

        return (
            <DocPage title="Navigating domains" intro="Choosing a domain changes the page. The shell stays: navigation, settings, help, and the account are still there.">
                <DocSection title="When to use">
                    <DocList
                        items={[
                            { title: "Another part of the product", body: "Pick it in the navigation. The page inside changes." },
                            { title: "The shell stays", body: "Settings, help, and the account do not change with the domain." },
                        ]}
                    />
                </DocSection>
                <DocSection title="Domains">
                    <DocDemo bleed>
                    <Shell
                        product={<span className="px-spacing-04 font-semibold text-ink">North</span>}
                        navigation={
                            <Menu
                                items={domains}
                                value={domain}
                                onValueChange={(value) => {
                                    if (isDomain(value)) {
                                        setDomain(value);
                                    }
                                }}
                            />
                        }
                        settings={
                            <Button variant="ghost" className="justify-start">
                                Settings
                            </Button>
                        }
                        header={<span className="font-medium text-ink">{current}</span>}
                        help={<Button variant="ghost">Help</Button>}
                        user={
                            <>
                                <Avatar name="Alex Kim" />
                                <Button variant="secondary">Account</Button>
                            </>
                        }
                    >
                        {domainPage(domain)}
                    </Shell>
                    </DocDemo>
                </DocSection>
            </DocPage>
        );
    },
};
