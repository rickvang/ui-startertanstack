import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../base/avatar";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { SettingsScreen, settingsSections, type SettingsFacts, type SettingsSection } from "../modules/settings-screen";
import { Shell } from "../modules/shell";
import { ShellBar, shellDomainHelp } from "../modules/shell-actions";
import { Menu } from "../navigation/menu";
import { DocDemo, DocList, DocPage, DocParagraph, DocSection } from "../templates/doc";

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

function isSettingsSection(value: string): value is SettingsSection {
    return value === "product" || value === "access" || value === "remove";
}

function sectionLabel(section: SettingsSection): string {
    switch (section) {
        case "product":
            return "Product";
        case "access":
            return "Access";
        case "remove":
            return "Remove";
        default: {
            const exhaustive: never = section;
            return exhaustive;
        }
    }
}

function Account({ name }: { name: string }) {
    return (
        <button
            type="button"
            className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus"
            aria-label={`${name}, account`}
        >
            <Avatar name={name} />
        </button>
    );
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

function SectionSettings() {
    const [facts, setFacts] = useState<SettingsFacts>({
        name: "North",
        description: "The open work for this product.",
        invite: "owners",
        membersCanCreate: false,
    });
    const [removed, setRemoved] = useState(false);
    const [section, setSection] = useState<SettingsSection>("product");

    return (
        <Shell
            frame="header-side"
            product={<span className="px-spacing-04 font-semibold text-ink">{removed ? "Removed" : facts.name}</span>}
            navigation={
                <Menu
                    items={settingsSections}
                    value={section}
                    onValueChange={(value) => {
                        if (isSettingsSection(value)) {
                            setSection(value);
                        }
                    }}
                />
            }
            settings={null}
            header={<p className="mb-spacing-04 font-medium text-ink">{sectionLabel(section)}</p>}
            help={null}
            user={<Account name="Alex Kim" />}
        >
            <SettingsScreen section={section} facts={facts} removed={removed} onChange={setFacts} onRemove={() => setRemoved(true)} />
        </Shell>
    );
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
        const [facts, setFacts] = useState<SettingsFacts>({
            name: "North",
            description: "The open work for this product.",
            invite: "owners",
            membersCanCreate: false,
        });
        const [removed, setRemoved] = useState(false);
        const [domain, setDomain] = useState<Domain>("projects");
        const [place, setPlace] = useState<Place>("domain");
        const title = place === "settings" ? "Settings" : (domains.find((item) => item.value === domain)?.label ?? "Projects");
        const help = placeHelp(place, domain);

        return (
            <DocPage title="Product settings" intro="Settings in the sider opens the product screen. Product, access, and remove stay on that screen. The domain menu stays. A domain takes you back to that page.">
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
                            product={<span className="px-spacing-04 font-semibold text-ink">{removed ? "Removed" : facts.name}</span>}
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
                            {place === "settings" ? <SettingsScreen facts={facts} removed={removed} onChange={setFacts} onRemove={() => setRemoved(true)} /> : domainPage(domain)}
                        </Shell>
                    </DocDemo>
                </DocSection>
                <DocSection title="Header, then side">
                    <DocParagraph>The top bar stays the product and the account. The side is Product, Access, and Remove. Remove opens a dialog over that page.</DocParagraph>
                    <DocDemo bleed>
                        <SectionSettings />
                    </DocDemo>
                </DocSection>
            </DocPage>
        );
    },
};
