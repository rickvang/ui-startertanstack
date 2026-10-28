import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { drawerSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { DocCodeSection } from "../templates/doc";
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

        return (
            <div className="flex flex-col items-start gap-spacing-04 p-spacing-05">
                <p className="max-w-xl text-sm text-muted">A full-height panel from the edge. The page behind stays. Motion for this panel is on Foundations/Motion, Drawer reveal.</p>
                <Button variant="secondary" onClick={() => setOpen(true)}>
                    Open
                </Button>
                <Drawer open={open} title="Alex Kim" onClose={() => setOpen(false)}>
                    <p>Role, access, and the last visit stay beside the list.</p>
                </Drawer>
                <DocCodeSection note={libraryExportNote} code={drawerSnippet} />
            </div>
        );
    },
};
