import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocDemo, DocList, DocPage, DocSection } from "../templates/doc";
import { AccountScreen, type AccountFacts } from "./account-screen";

const meta = {
    title: "Modules/Account",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Account: Story = {
    name: "Account",
    render: () => {
        const [facts, setFacts] = useState<AccountFacts>({ name: "Alex Kim", email: "alex@north.example" });

        return (
            <DocPage title="Account" intro="The account is the person. The screen holds their name and email. Edit changes them. Save keeps the new facts. Cancel leaves them as they were.">
                <DocSection title="What it holds">
                    <DocList
                        items={[
                            { title: "The person", body: "The name and email belong to the person, not to the organization." },
                            { title: "It stays", body: "The account stays when the domain or the organization changes." },
                            { title: "Not billing", body: "The organization's plan belongs on Billing. It is separate from this account." },
                        ]}
                    />
                </DocSection>
                <DocSection title="Account">
                    <DocDemo className="max-w-xl">
                        <AccountScreen name={facts.name} email={facts.email} onSave={setFacts} />
                    </DocDemo>
                </DocSection>
            </DocPage>
        );
    },
};
