import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, libraryExportNote, tabsSnippet } from "../../../.storybook/story-snippets";
import { Switch } from "../base/switch";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocRows, DocSection } from "../templates/doc";
import { Tabs } from "./tabs";

const meta = {
    tags: ["autodocs"],
    parameters: autodocsComponentParameters,
    title: "Components/Tabs",
    component: Tabs,
    args: {
        defaultValue: "members",
        items: [
            { value: "members", label: "Members", content: "Alex Kim, Jordan Lee, Sam Patel" },
            { value: "settings", label: "Settings", content: "Project name and access." },
        ],
    },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    ...docsFromSnippet(tabsSnippet),
};

export const Motion: Story = {
    name: "Motion",
    parameters: { layout: "fullscreen" },
    render: () => {
        const [reduce, setReduce] = useState(false);

        return (
            <DocPage title="Tabs" intro="The underline measures the active tab and travels. The label uses feedback. The panel fades. The first paint snaps, so the mark does not slide in from zero.">
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
                    <DocBullets items={["A route change. Use the shell.", "A pill bar from another system. These tabs stay an underline."]} />
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
