import type { Meta, StoryObj } from "@storybook/react-vite";
import { avatarSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Avatar } from "./avatar";
import { avatarAgentGuidance } from "./inputs.agent";

const meta = {
    title: "Components/Avatar",
    parameters: {
        layout: "fullscreen",
        agent: avatarAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AvatarStory: Story = {
    name: "Avatar",
    render: () => (
        <DocPage title="Avatar" intro="Represent a person with initials or an image. Keep it compact in lists, headers, and account chrome.">
            <DocSection title="Example">
                <DocDemo className="flex items-center gap-spacing-04">
                    <Avatar name="Alex Kim" />
                    <Avatar name="Jordan Lee" />
                    <Avatar name="Sam Patel" />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Identity needs a compact face in lists, headers, or account chrome.", "The person is named nearby; Avatar is not the only label."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["A status or category. Use Badge.", "A product logo in Shell. Use the product slot, not Avatar."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={avatarSnippet} />
        </DocPage>
    ),
};
