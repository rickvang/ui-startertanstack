import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, menuSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Menu } from "./menu";
import { menuAgentGuidance } from "./navigation.agent";

const meta = {
    title: "Components/Menu",
    parameters: {
        layout: "fullscreen",
        agent: menuAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const MenuStory: Story = {
    name: "Menu",
    render: () => (
        <DocPage title="Menu" intro="Present a structured set of destinations or commands. In product chrome, Menu usually sits in Shell navigation.">
            <DocSection title="Example">
                <DocDemo className="max-w-xs">
                    <Menu
                        defaultValue="members"
                        items={[
                            { value: "members", label: "Members" },
                            { value: "settings", label: "Settings" },
                            { value: "billing", label: "Billing" },
                        ]}
                    />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets
                    items={[
                        "A structured list of destinations or commands with one current value.",
                        "Shell side navigation that changes the page while chrome stays.",
                    ]}
                />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A single row of actions from one button. Use Dropdown.",
                        "Section jumps on one page. Use Anchor.",
                        "Weakly related peer panels. Use Tabs.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={menuSnippet} />
        </DocPage>
    ),
};
