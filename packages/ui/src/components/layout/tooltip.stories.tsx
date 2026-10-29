import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, tooltipSnippet } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Tooltip } from "./tooltip";

const meta = {
    title: "Layout/Overlays",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TooltipStory: Story = {
    name: "Tooltip",
    render: () => (
        <DocPage title="Tooltip" intro="A short hint on hover or focus. It has no actions. It does not stop the page.">
            <DocSection title="Example">
                <DocDemo className="flex flex-col items-start gap-spacing-04">
                    <Tooltip label="Shown on the project home.">
                        <Button variant="ghost">Why we ask</Button>
                    </Tooltip>
                    <p className="text-sm text-muted">Move away or Tab away to dismiss it.</p>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A short hint that is not required to finish the task.", "Hover or focus is enough. There is nothing to click inside it."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "A control, a field, or a link inside the hint. Use Popover.",
                        "A result of an action. Use Message, or Toast after leaving the work.",
                        "A yes or no. Use Dialog.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={tooltipSnippet} />
        </DocPage>
    ),
};
