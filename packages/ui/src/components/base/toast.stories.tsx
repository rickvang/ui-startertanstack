import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, toastSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocRows, DocSection } from "../templates/doc";
import { Button } from "./button";
import { Switch } from "./switch";
import { Toast, type ToastPlacement } from "./toast";

const meta = {
    title: "Components/Toast",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToastStory: Story = {
    name: "Toast",
    render: () => {
        const [open, setOpen] = useState(false);
        const [placement, setPlacement] = useState<ToastPlacement>("bottom");
        const [reduce, setReduce] = useState(false);

        function show(next: ToastPlacement) {
            setPlacement(next);
            setOpen(true);
        }

        return (
            <DocPage title="Toast" intro="A brief notice that is not next to the work. It does not stop the page. Bottom of the screen, or the top right.">
                <DocSection title="Example">
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Switch label="Reduced motion" checked={reduce} onCheckedChange={setReduce} />
                        <div className="flex flex-wrap gap-spacing-03">
                            <Button variant="secondary" onClick={() => show("bottom")}>
                                Show at bottom
                            </Button>
                            <Button variant="secondary" onClick={() => show("end")}>
                                Show at top right
                            </Button>
                        </div>
                    </DocDemo>
                    <Toast open={open} title="Product saved" tone="success" placement={placement} reduceMotion={reduce} onDismiss={() => setOpen(false)}>
                        The name and description are kept.
                    </Toast>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["A brief result after the person has left the work.", "The page should stay usable."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "A result next to the work that caused it. Use Message.",
                            "A page-level note that should stay. Use Banner.",
                            "A yes or no, or a short form the page must wait for. Use Dialog.",
                        ]}
                    />
                </DocSection>
                <DocSection title="Motion">
                    <DocRows
                        headers={["Part", "Role"]}
                        rows={[
                            { label: "Opening", detail: "motion-fade. Opacity only." },
                            { label: "Closing", detail: "motion-leave. Unmount waits for leave." },
                            { label: "Reduced motion", detail: "Instant. The page keeps focus." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={libraryExportNote} code={toastSnippet} />
            </DocPage>
        );
    },
};
