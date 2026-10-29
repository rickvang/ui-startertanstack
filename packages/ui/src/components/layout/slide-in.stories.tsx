import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, slideInSnippet } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { Switch } from "../base/switch";
import { TextField } from "../base/text-field";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocRows, DocSection } from "../templates/doc";
import { SlideIn } from "./slide-in";

const meta = {
    title: "Layout/Overlays",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const SlideInStory: Story = {
    name: "Slide-in",
    render: () => {
        const [open, setOpen] = useState(false);
        const [reduce, setReduce] = useState(false);

        return (
            <DocPage title="Slide-in" intro="A small panel from the edge. It does not take the full height. The overlay fades with it. The page behind stays.">
                <DocSection title="Example">
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Switch label="Reduced motion" checked={reduce} onCheckedChange={setReduce} />
                        <Button variant="secondary" onClick={() => setOpen(true)}>
                            Invite
                        </Button>
                        <p className="text-sm text-muted">Escape or Close returns focus to this button.</p>
                    </DocDemo>
                    <SlideIn open={open} title="Invite" onClose={() => setOpen(false)} reduceMotion={reduce}>
                        <TextField label="Email" type="email" />
                        <Button>Send</Button>
                    </SlideIn>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["A quick task on the current page.", "The panel should not take the full height."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "The task needs the full height, or the person will compare it with the list for a while. Use Drawer.",
                            "A yes or no. Use Dialog.",
                            "A small screen, from the foot. Use Bottom sheet.",
                            "A small panel attached to a control. Use Popover.",
                            "A nested overlay. Do not stack a modal on a slide-in.",
                            "A route change. A slide-in closes back to the page that opened it.",
                        ]}
                    />
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
                <DocCodeSection note={libraryExportNote} code={slideInSnippet} />
            </DocPage>
        );
    },
};
