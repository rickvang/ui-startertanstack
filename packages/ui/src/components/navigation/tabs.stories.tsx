import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, tabsSnippet } from "../../../.storybook/story-snippets";
import { Switch } from "../base/switch";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocRows, DocSection } from "../templates/doc";
import { tabsAgentGuidance } from "./navigation.agent";
import { Tabs } from "./tabs";

const meta = {
    title: "Components/Tabs",
    parameters: {
        layout: "fullscreen",
        agent: tabsAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TabsStory: Story = {
    name: "Tabs",
    render: () => {
        const [reduce, setReduce] = useState(false);

        return (
            <DocPage title="Tabs" intro="Switch weakly related parts of one record without leaving the page. The underline measures the active tab and travels.">
                <DocSection title="Example">
                    <DocDemo>
                        <Switch label="Reduced motion" checked={reduce} onCheckedChange={setReduce} />
                        <Tabs
                            reduceMotion={reduce}
                            defaultValue="members"
                            items={[
                                { value: "members", label: "Members", content: "Alex Kim, Jordan Lee, Sam Patel" },
                                { value: "access", label: "Access", content: "Who can invite, and who can remove a project." },
                                { value: "activity", label: "Activity", content: "Last visit was today." },
                            ]}
                        />
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["The sections are peers on one surface.", "The person should see which tab is current while the mark moves."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "A route change. Use the shell.",
                            "A linear process. Use Steps.",
                            "A pill bar from another system. These tabs stay an underline.",
                        ]}
                    />
                </DocSection>
                <DocSection title="Motion">
                    <DocRows
                        headers={["Part", "Role"]}
                        rows={[
                            { label: "Mark", detail: "offsetLeft and offsetWidth. motion-travel. Resize snaps, then travel is allowed again." },
                            { label: "Label", detail: "motion-feedback." },
                            { label: "Panel", detail: "animate-motion-fade. Opacity only." },
                            { label: "Reduced motion", detail: "The mark jumps. The panel does not fade." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={libraryExportNote} code={tabsSnippet} />
            </DocPage>
        );
    },
};
