import type { Meta, StoryObj } from "@storybook/react-vite";
import { anchorSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Anchor } from "./anchor";
import { anchorAgentGuidance } from "./navigation.agent";

const meta = {
    title: "Components/Anchor",
    parameters: {
        layout: "fullscreen",
        agent: anchorAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AnchorStory: Story = {
    name: "Anchor",
    render: () => (
        <DocPage title="Anchor" intro="Jump between named sections on the same page. The page does not change route.">
            <DocSection title="Example">
                <DocDemo className="max-w-sm">
                    <Anchor
                        items={[
                            { href: "#members", label: "Members" },
                            { href: "#details", label: "Details" },
                            { href: "#settings", label: "Settings" },
                        ]}
                    />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["The page has named sections the person should jump between.", "The sections stay on one scrollable surface."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Product area switching. Use Shell navigation.",
                        "Parent path of the current page. Use Breadcrumb.",
                        "Peer panels that replace each other. Use Tabs.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={anchorSnippet} />
        </DocPage>
    ),
};
