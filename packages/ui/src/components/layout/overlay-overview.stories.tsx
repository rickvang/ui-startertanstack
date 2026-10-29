import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocPage, DocParagraph, DocRows, DocSection } from "../templates/doc";

const meta = {
    title: "Layout/Overlays",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
    name: "Overview",
    render: () => (
        <DocPage title="Overlays" intro="One overlay at a time. Pick the job, then open that story.">
            <DocSection title="How to choose">
                <DocParagraph>The page either waits, stays in view, or stays live. A hint is not an overlay job.</DocParagraph>
                <DocRows
                    headers={["Job", "Use"]}
                    rows={[
                        { label: "The page must wait. Confirm, or one or two fields.", detail: "Dialog." },
                        { label: "Keep the page. The task needs the full height.", detail: "Drawer." },
                        { label: "Keep the page. A quick task that should not take the full height.", detail: "Slide-in." },
                        { label: "The same job as Dialog or Drawer, on a small screen, from the foot.", detail: "Bottom sheet." },
                        { label: "A small panel attached to a control. The page stays live.", detail: "Popover." },
                        { label: "A short hint. No actions.", detail: "Tooltip." },
                        { label: "A result next to the work.", detail: "Message. Not an overlay." },
                        { label: "A brief notice after leaving the work.", detail: "Toast. Not an overlay." },
                        { label: "A note about the whole page that should stay.", detail: "Banner. Not an overlay." },
                    ]}
                />
            </DocSection>
            <DocSection title="Do not nest">
                <DocParagraph>Do not open a dialog, drawer, slide-in, bottom sheet, or popover from another overlay. Close the first one. A tooltip may sit on a control inside an overlay.</DocParagraph>
            </DocSection>
        </DocPage>
    ),
};
