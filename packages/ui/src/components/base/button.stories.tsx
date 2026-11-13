import type { Meta, StoryObj } from "@storybook/react-vite";
import { buttonSnippet, libraryExportNote } from "../../../.storybook/copyable-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Button } from "./button";
import { buttonAgentGuidance } from "./controls.agent";

const meta = {
    title: "Components/Button",
    parameters: {
        layout: "fullscreen",
        agent: buttonAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
    name: "Button",
    render: () => (
        <DocPage title="Button" intro="Pick the variant from how primary the action is, not from color taste. One primary action per region.">
            <DocSection title="Example">
                <DocDemo className="flex flex-wrap items-center gap-spacing-04">
                    <Button variant="primary">Save</Button>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="ghost">Theme</Button>
                    <Button disabled>Save</Button>
                    <Button size="dense">Dense</Button>
                    <Button size="wide" className="max-w-xs">
                        Wide
                    </Button>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets
                    items={[
                        "Primary for the one main action in the region.",
                        "Secondary for a supporting action beside the primary.",
                        "Ghost for a quiet action in dense tool chrome.",
                    ]}
                />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Multiple primary buttons in one region.",
                        "A status label. Use Badge.",
                        "A navigation destination that should look like a link in a menu. Use Menu or Anchor.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={buttonSnippet} />
        </DocPage>
    ),
};
