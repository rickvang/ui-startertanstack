import type { Meta, StoryObj } from "@storybook/react-vite";
import { breadcrumbSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Breadcrumb } from "./breadcrumb";
import { breadcrumbAgentGuidance } from "./navigation.agent";

const meta = {
    title: "Components/Breadcrumb",
    parameters: {
        layout: "fullscreen",
        agent: breadcrumbAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BreadcrumbStory: Story = {
    name: "Breadcrumb",
    render: () => (
        <DocPage title="Breadcrumb" intro="Show the path inside the current area. Quiet ancestors, then the current page strongest.">
            <DocSection title="Example">
                <DocDemo>
                    <Breadcrumb
                        items={[
                            { label: "Projects", href: "#projects" },
                            { label: "Studio", href: "#studio" },
                            { label: "Members" },
                        ]}
                    />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["The person needs the parent path of the current page.", "Depth is more than one level inside an area."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A second product menu in the header. Use Shell navigation.",
                        "Same-page section jumps. Use Anchor.",
                        "Switching product domains. Use Menu in Shell.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={breadcrumbSnippet} />
        </DocPage>
    ),
};
