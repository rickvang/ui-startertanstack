import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../base/avatar";
import { Button } from "../base/button";
import { Menu } from "../navigation/menu";
import { DocList, DocPage, DocSection } from "../templates/doc";
import { Shell as ShellModule } from "./shell";

const domains = [
    { value: "projects", label: "Projects" },
    { value: "members", label: "Members" },
    { value: "billing", label: "Billing" },
] as const;

type Domain = (typeof domains)[number]["value"];

function isDomain(value: string): value is Domain {
    return value === "projects" || value === "members" || value === "billing";
}

const meta = {
    title: "Modules/Shell",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Shell: Story = {
    name: "Shell",
    render: () => {
        const [domain, setDomain] = useState<Domain>("members");
        const current = domains.find((item) => item.value === domain)?.label ?? "Members";

        return (
            <DocPage title="Shell" intro="The shell stays while the person moves. It holds the product navigation, settings, the user, and help. Layout chooses where those areas sit. Navigating domains is the pattern that changes the page inside.">
                <DocSection title="Areas">
                    <DocList
                        items={[
                            { title: "Navigation", body: "The menu of domains. It is the way into Projects, Members, and Billing." },
                            { title: "Settings", body: "Product settings stay out of the domain menu. They remain available on every page." },
                            { title: "User", body: "The picture and the account action belong to the person, not to the current domain." },
                            { title: "Help", body: "Help stays in the header so it is available on every domain." },
                        ]}
                    />
                </DocSection>
                <DocSection title="Shell">
                    <ShellModule
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
                        <p className="text-sm text-ink">{current} is the current domain.</p>
                    </ShellModule>
                </DocSection>
            </DocPage>
        );
    },
};
