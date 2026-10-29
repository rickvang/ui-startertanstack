import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { dialogSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { TextField } from "../base/text-field";
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
        const [removeOpen, setRemoveOpen] = useState(false);
        const [renameOpen, setRenameOpen] = useState(false);
        const [result, setResult] = useState("The product is still here.");
        const [name, setName] = useState("North");
        const [draft, setDraft] = useState("North");

        return (
            <DocPage title="Dialog" intro="A dialog stops the page. Confirm, or a short form with one or two fields. The overlay and the panel fade. They do not travel, scale, or spring.">
                <DocSection title="Example">
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Button variant="danger" onClick={() => setRemoveOpen(true)}>
                            Remove
                        </Button>
                        <p className="text-sm text-ink">{result}</p>
                    </DocDemo>
                    <Dialog
                        open={removeOpen}
                        title="Remove North"
                        confirmLabel="Remove"
                        onCancel={() => setRemoveOpen(false)}
                        onConfirm={() => {
                            setResult("North was removed.");
                            setRemoveOpen(false);
                        }}
                    >
                        Removing the product deletes its projects. This cannot be undone.
                    </Dialog>
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setDraft(name);
                                setRenameOpen(true);
                            }}
                        >
                            Rename
                        </Button>
                        <p className="text-sm text-ink">{name}</p>
                    </DocDemo>
                    <Dialog
                        open={renameOpen}
                        title="Rename product"
                        confirmLabel="Rename"
                        confirmVariant="primary"
                        onCancel={() => setRenameOpen(false)}
                        onConfirm={() => {
                            setName(draft);
                            setRenameOpen(false);
                        }}
                    >
                        <TextField label="Name" value={draft} onChange={(event) => setDraft(event.target.value)} />
                    </Dialog>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["A short decision the person must answer before they continue.", "A confirm, or a form with one or two fields."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "The person needs the page behind the dialog to answer. Use Drawer or Slide-in.",
                            "A nested overlay. Do not open a dialog from a dialog, a drawer, or a slide-in.",
                            "A multi-section form. That belongs on a pattern.",
                            "A field that belongs on the page. Leave it on the page.",
                        ]}
                    />
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
