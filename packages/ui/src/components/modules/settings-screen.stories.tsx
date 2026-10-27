import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../base/avatar";
import { Menu } from "../navigation/menu";
import { DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { SettingsScreen, settingsSections, type SettingsFacts, type SettingsSection } from "./settings-screen";
import { Shell } from "./shell";

const initialFacts: SettingsFacts = {
    name: "North",
    description: "The open work for this product.",
    invite: "owners",
    membersCanCreate: false,
};

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

function SectionFrame() {
    const [facts, setFacts] = useState(initialFacts);
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
    title: "Modules/Settings",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Settings: Story = {
    name: "Settings",
    render: () => {
        const [facts, setFacts] = useState(initialFacts);
        const [removed, setRemoved] = useState(false);

        return (
            <DocPage title="Settings" intro="Settings is the product. The top bar keeps the product and the account. The side is Product, Access, and Remove.">
                <DocSection title="In the frame">
                    <DocParagraph>Choose a section in the side. Remove opens a dialog over the page and asks for the product name.</DocParagraph>
                    <DocDemo bleed>
                        <SectionFrame />
                    </DocDemo>
                </DocSection>
                <DocSection title="On its own">
                    <DocParagraph>The same screen can fill the page with tabs. Use that when settings replaces the current page and the domain menu stays.</DocParagraph>
                    <DocDemo className="max-w-xl">
                        <SettingsScreen facts={facts} removed={removed} onChange={setFacts} onRemove={() => setRemoved(true)} />
                    </DocDemo>
                </DocSection>
            </DocPage>
        );
    },
};
