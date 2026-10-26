import { useId, useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { Shell } from "../modules/shell";
import { ShellBar, shellDomainHelp } from "../modules/shell-actions";
import { Menu } from "../navigation/menu";
import { DocDemo, DocList, DocPage, DocSection } from "../templates/doc";
import { cx } from "../../utils/cx";

const organizations = [
    { value: "north", label: "North" },
    { value: "harbor", label: "Harbor" },
    { value: "field", label: "Field" },
] as const;

const domains = [
    { value: "projects", label: "Projects" },
    { value: "members", label: "Members" },
    { value: "billing", label: "Billing" },
] as const;

type Organization = (typeof organizations)[number]["value"];
type Domain = (typeof domains)[number]["value"];

function isDomain(value: string): value is Domain {
    return value === "projects" || value === "members" || value === "billing";
}

const pages: Record<Organization, Record<Domain, { title: string; body: string; badge?: string; tone?: "success" | "neutral" }>> = {
    north: {
        projects: { title: "Studio", body: "One open project. Invite the people who work on it." },
        members: { title: "Alex Kim", body: "Works on Studio.", badge: "Active" },
        billing: { title: "Plan", body: "North is on the Pro plan.", badge: "Pro" },
    },
    harbor: {
        projects: { title: "Pier", body: "Two open projects." },
        members: { title: "Jordan Lee", body: "Works on Pier.", badge: "Active" },
        billing: { title: "Plan", body: "Harbor is on the Team plan.", badge: "Team" },
    },
    field: {
        projects: { title: "Plot", body: "No open projects." },
        members: { title: "Members", body: "No one is invited yet." },
        billing: { title: "Plan", body: "Field is on the Free plan.", badge: "Free", tone: "neutral" },
    },
};

function organizationPage(organization: Organization, domain: Domain): ReactNode {
    const page = pages[organization][domain];

    return (
        <div className="flex max-w-md flex-col items-start gap-spacing-03">
            <h2 className="text-lg font-semibold text-ink">{page.title}</h2>
            <p className="text-sm text-ink">{page.body}</p>
            {page.badge ? <Badge variant={page.tone ?? "success"}>{page.badge}</Badge> : null}
        </div>
    );
}

function OrganizationSwitcher({
    value,
    onValueChange,
}: {
    value: Organization;
    onValueChange: (value: Organization) => void;
}) {
    const [open, setOpen] = useState(false);
    const listId = useId();
    const current = organizations.find((item) => item.value === value)?.label ?? "North";

    return (
        <div
            className="relative"
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    setOpen(false);
                }
            }}
        >
            <Button variant="ghost" className="w-full justify-between font-semibold" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((next) => !next)}>
                <span>{current}</span>
                <svg viewBox="0 0 16 16" aria-hidden="true" className="size-spacing-04 text-muted">
                    <path d="M4 6.5 8 10.5 12 6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </Button>
            {open ? (
                <div id={listId} role="listbox" aria-label="Organizations" className="absolute right-0 left-0 z-10 mt-spacing-02 flex flex-col gap-spacing-02 rounded-md border border-line bg-surface p-spacing-02 shadow-lg">
                    {organizations.map((item) => {
                        const selected = item.value === value;
                        return (
                            <button
                                key={item.value}
                                type="button"
                                role="option"
                                aria-selected={selected}
                                className={cx("rounded-md px-spacing-03 py-spacing-02 text-left text-sm", selected ? "bg-selected font-medium text-ink" : "text-ink")}
                                onClick={() => {
                                    onValueChange(item.value);
                                    setOpen(false);
                                }}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}

const meta = {
    title: "Patterns/Switching organizations",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const SwitchingOrganizations: Story = {
    name: "Switching organizations",
    render: () => {
        const [organization, setOrganization] = useState<Organization>("north");
        const [domain, setDomain] = useState<Domain>("projects");
        const current = domains.find((item) => item.value === domain)?.label ?? "Projects";
        const help = shellDomainHelp(domain);

        return (
            <DocPage title="Switching organizations" intro="Choosing an organization changes which organization the domains belong to. The shell stays: the domain menu, settings, help, and the account are still there.">
                <DocSection title="When to use">
                    <DocList
                        items={[
                            { title: "Another organization", body: "Pick it in the product slot. The page shows that organization." },
                            { title: "The domains stay", body: "Projects, Members, and Billing are still the way through the organization." },
                            { title: "The person stays", body: "Help and the account do not change with the organization." },
                        ]}
                    />
                </DocSection>
                <DocSection title="Organizations">
                    <DocDemo bleed>
                    <Shell
                        product={<OrganizationSwitcher value={organization} onValueChange={setOrganization} />}
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
                        header={<ShellBar title={current} helpTitle={help.title} helpBody={help.body} name="Alex Kim" />}
                        help={null}
                        user={null}
                    >
                        {organizationPage(organization, domain)}
                    </Shell>
                    </DocDemo>
                </DocSection>
            </DocPage>
        );
    },
};
