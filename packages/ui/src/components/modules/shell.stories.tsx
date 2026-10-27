import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../base/avatar";
import { Button } from "../base/button";
import { Menu } from "../navigation/menu";
import { DocBullets, DocDemo, DocPage, DocParagraph, DocRows, DocSection } from "../templates/doc";
import { ShellBar, shellDomainHelp } from "./shell-actions";
import { Shell as ShellModule } from "./shell";

const domains = [
    { value: "projects", label: "Projects" },
    { value: "members", label: "Members" },
    { value: "billing", label: "Billing" },
] as const;

const sectionPages = [
    { value: "people", label: "People" },
    { value: "invites", label: "Invites" },
    { value: "roles", label: "Roles" },
] as const;

const toolPages = [
    { value: "files", label: "Files" },
    { value: "layers", label: "Layers" },
    { value: "comments", label: "Comments" },
] as const;

type Domain = (typeof domains)[number]["value"];
type SectionPage = (typeof sectionPages)[number]["value"];
type ToolPage = (typeof toolPages)[number]["value"];

function isDomain(value: string): value is Domain {
    return value === "projects" || value === "members" || value === "billing";
}

function isSectionPage(value: string): value is SectionPage {
    return value === "people" || value === "invites" || value === "roles";
}

function isToolPage(value: string): value is ToolPage {
    return value === "files" || value === "layers" || value === "comments";
}

function Product() {
    return <span className="px-spacing-04 font-semibold text-ink">North</span>;
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

function PageLine({ children }: { children: string }) {
    return <p className="text-sm text-ink">{children}</p>;
}

function PublicShell() {
    const [domain, setDomain] = useState<Domain>("members");
    const current = domains.find((item) => item.value === domain)?.label ?? "Members";

    return (
        <ShellModule
            frame="header-content-footer"
            product={<Product />}
            navigation={
                <Menu
                    orientation="horizontal"
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
            header={null}
            help={
                <Button variant="ghost" className="justify-start">
                    Help
                </Button>
            }
            user={<Account name="Alex Kim" />}
        >
            <PageLine>{`${current} is the current page.`}</PageLine>
        </ShellModule>
    );
}

function SectionShell() {
    const [page, setPage] = useState<SectionPage>("people");
    const current = sectionPages.find((item) => item.value === page)?.label ?? "People";

    return (
        <ShellModule
            frame="header-side"
            product={<Product />}
            navigation={
                <Menu
                    items={sectionPages}
                    value={page}
                    onValueChange={(value) => {
                        if (isSectionPage(value)) {
                            setPage(value);
                        }
                    }}
                />
            }
            settings={
                <Button variant="ghost">Settings</Button>
            }
            header={<p className="mb-spacing-04 font-medium text-ink">{current}</p>}
            help={null}
            user={<Account name="Alex Kim" />}
        >
            <PageLine>{`${current} is a page in Members.`}</PageLine>
        </ShellModule>
    );
}

function AppShell() {
    const [domain, setDomain] = useState<Domain>("members");
    const current = domains.find((item) => item.value === domain)?.label ?? "Members";
    const help = shellDomainHelp(domain);

    return (
        <ShellModule
            product={<Product />}
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
            <PageLine>{`${current} is the current domain.`}</PageLine>
        </ShellModule>
    );
}

function ToolShell() {
    const [page, setPage] = useState<ToolPage>("files");
    const current = toolPages.find((item) => item.value === page)?.label ?? "Files";

    return (
        <ShellModule
            frame="side-content"
            product={null}
            navigation={
                <Menu
                    items={toolPages}
                    value={page}
                    onValueChange={(value) => {
                        if (isToolPage(value)) {
                            setPage(value);
                        }
                    }}
                />
            }
            settings={null}
            header={null}
            help={
                <Button variant="ghost" className="justify-start">
                    Help
                </Button>
            }
            user={<Account name="Alex Kim" />}
        >
            <PageLine>{`The canvas shows ${current}.`}</PageLine>
        </ShellModule>
    );
}

const meta = {
    title: "Modules/Shell",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Shell: Story = {
    name: "Shell",
    render: () => (
        <DocPage title="Shell" intro="The shell stays while the person moves. The frame decides where the navigation, settings, help, and the account sit.">
            <DocSection title="Areas">
                <DocBullets
                    items={[
                        "Navigation is the way into the product, or into the current section.",
                        "Settings stays out of the domain menu. It opens the product screen.",
                        "The account is the person. The picture opens it.",
                        "Help explains the current page. It is not another domain.",
                    ]}
                />
            </DocSection>
            <DocSection title="Frames">
                <DocParagraph>A product uses one frame. Pick it from how people move.</DocParagraph>
                <DocRows
                    headers={["Frame", "Use it when"]}
                    rows={[
                        { label: "Header, content, footer", detail: "A short set of links fits in the top bar. The page is read downward." },
                        { label: "Header, then side", detail: "People arrive from the product, then move inside one section." },
                        { label: "Side, then header", detail: "People switch areas all day. The side is the product menu." },
                        { label: "Side and content", detail: "The work is one tool. The side is the structure of that work." },
                    ]}
                />
            </DocSection>
            <DocSection title="Header, content, footer">
                <DocParagraph>The top bar carries the product and the links. Help and settings sit in the footer. The account stays in the top bar.</DocParagraph>
                <DocDemo bleed>
                    <PublicShell />
                </DocDemo>
            </DocSection>
            <DocSection title="Header, then side">
                <DocParagraph>The top bar is the product and the account. The side is the menu of the current section.</DocParagraph>
                <DocDemo bleed>
                    <SectionShell />
                </DocDemo>
            </DocSection>
            <DocSection title="Side, then header">
                <DocParagraph>The side is the product menu, with settings at the bottom. The header names the current area and holds help and the account.</DocParagraph>
                <DocDemo bleed>
                    <AppShell />
                </DocDemo>
            </DocSection>
            <DocSection title="Side and content">
                <DocParagraph>The side is the work. Help and the account sit at the bottom of that side. There is no product bar.</DocParagraph>
                <DocDemo bleed>
                    <ToolShell />
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
