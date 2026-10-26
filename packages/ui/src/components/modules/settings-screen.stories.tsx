import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocDemo, DocList, DocPage, DocSection } from "../templates/doc";
import { SettingsScreen, type SettingsFacts } from "./settings-screen";

const initialFacts: SettingsFacts = {
    name: "North",
    description: "The open work for this product.",
    invite: "owners",
    membersCanCreate: false,
};

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
            <DocPage title="Settings" intro="Settings is the product. Product holds the name and description. Access holds who can invite and whether members can create projects. Remove asks for the product name before the product is deleted.">
                <DocSection title="What it holds">
                    <DocList
                        items={[
                            { title: "Product", body: "The name and description belong to the product. Save keeps them and says so on the page." },
                            { title: "Access", body: "Owners or members can invite. Members can be allowed to create projects." },
                            { title: "Remove", body: "The product is removed only after its name is typed. Cancel leaves it in place." },
                        ]}
                    />
                </DocSection>
                <DocSection title="Settings">
                    <DocDemo className="max-w-xl">
                        <SettingsScreen facts={facts} removed={removed} onChange={setFacts} onRemove={() => setRemoved(true)} />
                    </DocDemo>
                </DocSection>
            </DocPage>
        );
    },
};
