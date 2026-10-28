import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { accountScreenSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocDemo, DocList, DocCodeSection, DocPage, DocSection } from "../templates/doc";
import { AccountScreen, type AccountFacts } from "./account-screen";

const initialFacts: AccountFacts = {
    name: "Alex Kim",
    email: "alex@north.example",
    emailNotices: true,
    language: "english",
};

const meta = {
    title: "Modules/Account",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Account: Story = {
    name: "Account",
    render: () => {
        const [facts, setFacts] = useState(initialFacts);
        const [removed, setRemoved] = useState(false);

        return (
            <DocPage title="Account" intro="The account is the person. Profile holds the name and email. Sign-in changes the password. Notices holds email notices and language. Remove asks for the person's name before the account is deleted.">
            <DocCodeSection note={libraryExportNote} code={accountScreenSnippet} />
                <DocSection title="What it holds">
                    <DocList
                        items={[
                            { title: "Profile", body: "The name and email belong to the person. The picture is the initials of the name." },
                            { title: "Sign-in", body: "The current password and a different new password are required. The password is not shown again." },
                            { title: "Notices", body: "Email notices and language stay with the person when the domain or the organization changes." },
                            { title: "Remove", body: "The account is removed only after the person's name is typed. Cancel leaves it in place." },
                        ]}
                    />
                </DocSection>
                <DocSection title="Account">
                    <DocDemo className="max-w-xl">
                        <AccountScreen facts={facts} removed={removed} onChange={setFacts} onRemove={() => setRemoved(true)} />
                    </DocDemo>
                </DocSection>
            </DocPage>
        );
    },
};
