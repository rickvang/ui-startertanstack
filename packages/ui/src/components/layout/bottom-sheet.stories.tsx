import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { bottomSheetSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { Switch } from "../base/switch";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocRows, DocSection } from "../templates/doc";
import { BottomSheet } from "./bottom-sheet";

const meta = {
    title: "Layout/Overlays",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BottomSheetStory: Story = {
    name: "Bottom sheet",
    render: () => {
        const [open, setOpen] = useState(false);
        const [reduce, setReduce] = useState(false);

        return (
            <DocPage title="Bottom sheet" intro="The panel rises from the foot of the screen. Use it on a small screen for the same job as Dialog or Drawer.">
                <DocSection title="Example">
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Switch label="Reduced motion" checked={reduce} onCheckedChange={setReduce} />
                        <Button variant="secondary" onClick={() => setOpen(true)}>
                            Filters
                        </Button>
                        <p className="text-sm text-muted">Escape or Close returns focus to this button.</p>
                    </DocDemo>
                    <BottomSheet open={open} title="Status" onClose={() => setOpen(false)} reduceMotion={reduce}>
                        <p>Active and invited stay in the list. The page behind waits.</p>
                    </BottomSheet>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["A small screen, and the panel should come from the foot.", "The same job as Dialog or Drawer, when a side panel or a centered dialog is too tall or too narrow."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "A large screen that can keep a list beside the task. Use Drawer.",
                            "A yes or no that fits in the center. Use Dialog.",
                            "A small panel attached to a control. Use Popover.",
                            "A short hint. Use Tooltip.",
                        ]}
                    />
                </DocSection>
                <DocSection title="Motion">
                    <DocRows
                        headers={["Part", "Role"]}
                        rows={[
                            { label: "Panel", detail: "motion-reveal. translate-y-full to translate-y-0. Unmount waits for reveal." },
                            { label: "Overlay", detail: "motion-reveal. Opacity only, with the panel." },
                            { label: "Reduced motion", detail: "Instant. Focus still moves to Close and back." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={libraryExportNote} code={bottomSheetSnippet} />
            </DocPage>
        );
    },
};
