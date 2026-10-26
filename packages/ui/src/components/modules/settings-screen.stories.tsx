import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocDemo, DocList, DocPage, DocSection } from "../templates/doc";
import { SettingsScreen } from "./settings-screen";

const meta = {
    title: "Modules/Settings",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Settings: Story = {
    name: "Settings",
    render: () => {
        const [name, setName] = useState("North");

        return (
            <DocPage title="Settings" intro="Settings is the product. The screen holds the product's facts. Edit changes them. Save keeps the new fact. Cancel leaves it as it was.">
                <DocSection title="What it holds">
                    <DocList
                        items={[
                            { title: "The product", body: "The name belongs to the product, not to a person and not to a domain." },
                            { title: "Out of the menu", body: "Settings stays under the domain menu. It is available on every page." },
                            { title: "Not the account", body: "The person's name and email belong on the account screen." },
                        ]}
                    />
                </DocSection>
                <DocSection title="Settings">
                    <DocDemo className="max-w-xl">
                        <SettingsScreen name={name} onNameChange={setName} />
                    </DocDemo>
                </DocSection>
            </DocPage>
        );
    },
};
