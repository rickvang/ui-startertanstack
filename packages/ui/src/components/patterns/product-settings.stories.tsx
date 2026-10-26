import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { SettingsScreen } from "../modules/settings-screen";
import { Shell } from "../modules/shell";
import { ShellBar, shellDomainHelp } from "../modules/shell-actions";
import { Menu } from "../navigation/menu";
import { DocDemo, DocList, DocPage, DocSection } from "../templates/doc";

const domains = [
    { value: "projects", label: "Projects" },
    { value: "members", label: "Members" },
    { value: "billing", label: "Billing" },
] as const;

type Domain = (typeof domains)[number]["value"];

type Place = "domain" | "settings";

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

function placeHelp(place: Place, domain: Domain): { title: string; body: string } {
    switch (place) {
        case "domain":
            return shellDomainHelp(domain);
        case "settings":
            return {
                title: "Settings",
                body: "Settings is this product. It stays out of the domain menu.",
            };
        default: {
            const exhaustive: never = place;
            return exhaustive;
        }
    }
}

const meta = {
    title: "Patterns/Product settings",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductSettings: Story = {
    name: "Product settings",
    render: () => {
        const [productName, setProductName] = useState("North");
        const [domain, setDomain] = useState<Domain>("projects");
        const [place, setPlace] = useState<Place>("domain");
        const title = place === "settings" ? "Settings" : (domains.find((item) => item.value === domain)?.label ?? "Projects");
        const help = placeHelp(place, domain);

        return (
            <DocPage title="Product settings" intro="Settings in the sider opens the product screen. The domain menu stays. A domain takes you back to that page. The account stays the person's.">
                <DocSection title="When to use">
                    <DocList
                        items={[
                            { title: "The product", body: "Change a fact that belongs to the product, such as its name." },
                            { title: "From any page", body: "Settings stays under the domain menu. It is not a domain." },
                            { title: "Back to the work", body: "Choosing a domain leaves settings and opens that page." },
                        ]}
                    />
                </DocSection>
                <DocSection title="Settings">
                    <DocDemo bleed>
                        <Shell
                            product={<span className="px-spacing-04 font-semibold text-ink">{productName}</span>}
                            navigation={
                                <Menu
                                    items={domains}
                                    value={place === "domain" ? domain : ""}
                                    onValueChange={(value) => {
                                        if (isDomain(value)) {
                                            setDomain(value);
                                            setPlace("domain");
                                        }
                                    }}
                                />
                            }
                            settings={
                                <Button
                                    variant="ghost"
                                    aria-current={place === "settings" ? "page" : undefined}
                                    className={place === "settings" ? "w-full justify-start bg-selected" : "w-full justify-start"}
                                    onClick={() => setPlace((current) => (current === "settings" ? "domain" : "settings"))}
                                >
                                    Settings
                                </Button>
                            }
                            header={<ShellBar title={title} helpTitle={help.title} helpBody={help.body} name="Alex Kim" />}
                            help={null}
                            user={null}
                        >
                            {place === "settings" ? <SettingsScreen name={productName} onNameChange={setProductName} /> : domainPage(domain)}
                        </Shell>
                    </DocDemo>
                </DocSection>
            </DocPage>
        );
    },
};
