import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { dialogSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocRows, DocSection } from "../templates/doc";
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
            <DocPage title="Dialog" intro="A yes or no in place. The overlay and the panel fade. They do not travel, scale, or spring.">
                <DocSection title="Example">
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Button variant="danger" onClick={() => setOpen(true)}>
                            Remove
                        </Button>
                        <p className="text-sm text-ink">{result}</p>
                    </DocDemo>
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
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["The person must confirm before something is destroyed.", "The choice is yes or no, and the page can wait."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets items={["More than a yes or no. Use Drawer.", "A field that belongs on the page. Leave it on the page."]} />
                </DocSection>
                <DocSection title="Motion">
                    <DocRows
                        headers={["Part", "Role"]}
                        rows={[
                            { label: "Opening", detail: "motion-fade. Opacity only, on the overlay and the panel." },
                            { label: "Closing", detail: "motion-leave. Unmount waits for leave." },
                            { label: "Reduced motion", detail: "Instant. Focus still moves to Cancel and back." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={libraryExportNote} code={dialogSnippet} />
            </DocPage>
        );
    },
};
