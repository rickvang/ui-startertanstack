import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { accountInformationSnippet, compositionNote } from "../../../.storybook/story-snippets";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { AccountScreen, type AccountFacts } from "../modules/account-screen";
import { Shell } from "../modules/shell";
import { ShellBar, shellDomainHelp } from "../modules/shell-actions";
import { Menu } from "../navigation/menu";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";

const domains = [
    { value: "projects", label: "Projects" },
    { value: "members", label: "Members" },
    { value: "billing", label: "Billing" },
] as const;

type Domain = (typeof domains)[number]["value"];

type Place = "domain" | "account";

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
        case "account":
            return {
                title: "Account",
                body: "This account belongs to the person. It stays when the domain or the organization changes.",
            };
        default: {
            const exhaustive: never = place;
            return exhaustive;
        }
    }
}

const meta = {
    title: "Patterns/Account information",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AccountInformation: Story = {
    name: "Account information",
    render: () => {
        const [facts, setFacts] = useState<AccountFacts>({
            name: "Alex Kim",
            email: "alex@north.example",
            emailNotices: true,
            language: "english",
        });
        const [removed, setRemoved] = useState(false);
        const [domain, setDomain] = useState<Domain>("projects");
        const [place, setPlace] = useState<Place>("domain");
        const title = place === "account" ? "Account" : (domains.find((item) => item.value === domain)?.label ?? "Projects");
        const help = placeHelp(place, domain);

        return (
            <DocPage title="Account information" intro="The picture opens the person's account. Profile, sign-in, notices, and remove stay on that screen. The domain menu stays.">
                <DocSection title="Example">
                    <DocParagraph>The picture opens the account. A domain takes you back to that page. Saving does not change the domain or the organization.</DocParagraph>
                    <DocDemo bleed>
                        <Shell
                            product={<span className="px-spacing-04 font-semibold text-ink">North</span>}
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
                                <Button variant="ghost" className="w-full justify-start">
                                    Settings
                                </Button>
                            }
                            header={
                                <ShellBar
                                    title={title}
                                    helpTitle={help.title}
                                    helpBody={help.body}
                                    name={facts.name}
                                    accountCurrent={place === "account"}
                                    onAccount={() => setPlace((current) => (current === "account" ? "domain" : "account"))}
                                />
                            }
                            help={null}
                            user={null}
                        >
                            {place === "account" ? <AccountScreen facts={facts} removed={removed} onChange={setFacts} onRemove={() => setRemoved(true)} /> : domainPage(domain)}
                        </Shell>
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets
                        items={[
                            "Change the name or email that belongs to the person.",
                            "Open it from any page. It is not a domain and not the product settings.",
                        ]}
                    />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets items={["The facts belong to the product. Use product settings."]} />
                </DocSection>
                <DocCodeSection note={compositionNote} code={accountInformationSnippet} />
            </DocPage>
        );
    },
};
