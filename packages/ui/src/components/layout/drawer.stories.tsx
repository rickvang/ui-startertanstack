import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { drawerSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { Switch } from "../base/switch";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocRows, DocSection } from "../templates/doc";
import { Drawer } from "./drawer";

const meta = {
    title: "Layout/Overlays",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const DrawerStory: Story = {
    name: "Drawer",
    render: () => {
        const [open, setOpen] = useState(false);
        const [reduce, setReduce] = useState(false);

        return (
            <DocPage title="Drawer" intro="The panel travels its own width and decelerates into place. The overlay fades with it. The page behind stays.">
                <DocSection title="Example">
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Switch label="Reduced motion" checked={reduce} onCheckedChange={setReduce} />
                        <Button variant="secondary" onClick={() => setOpen(true)}>
                            Open
                        </Button>
                        <p className="text-sm text-muted">Escape or Close returns focus to this button.</p>
                    </DocDemo>
                    <Drawer open={open} title="Alex Kim" onClose={() => setOpen(false)} reduceMotion={reduce}>
                        <p>Role, access, and the last visit stay beside the list.</p>
                    </Drawer>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["The person keeps the page, and the task needs the full height.", "The panel should show where it came from."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets items={["A yes or no. Use Dialog.", "The product menu. That is the layout side, and it stays put."]} />
                </DocSection>
                <DocSection title="Motion">
                    <DocRows
                        headers={["Part", "Role"]}
                        rows={[
                            { label: "Panel", detail: "motion-reveal. translate-x-full to translate-x-0. Unmount waits for reveal." },
                            { label: "Overlay", detail: "motion-reveal. Opacity only, with the panel." },
                            { label: "Reduced motion", detail: "Instant. Focus still moves to Close and back." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={libraryExportNote} code={drawerSnippet} />
            </DocPage>
        );
    },
};
