import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { dialogSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocCodeSection } from "../templates/doc";
import { Button } from "../base/button";
import { Dialog } from "./dialog";

const meta = {
    title: "Layout/Overlays",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const DialogStory: Story = {
    name: "Dialog",
    render: () => {
        const [open, setOpen] = useState(false);
        const [result, setResult] = useState("The product is still here.");

        return (
            <div className="flex flex-col items-start gap-spacing-04 p-spacing-05">
                <DocCodeSection note={libraryExportNote} code={dialogSnippet} />
                <Button variant="danger" onClick={() => setOpen(true)}>
                    Remove
                </Button>
                <p className="text-sm text-ink">{result}</p>
                <Dialog
                    open={open}
                    title="Remove North"
                    confirmLabel="Remove"
                    onCancel={() => setOpen(false)}
                    onConfirm={() => {
                        setResult("North was removed.");
                        setOpen(false);
                    }}
                >
                    Removing the product deletes its projects. This cannot be undone.
                </Dialog>
            </div>
        );
    },
};
