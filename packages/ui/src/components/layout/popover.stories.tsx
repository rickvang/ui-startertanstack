import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, popoverSnippet } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Popover } from "./popover";

const meta = {
    title: "Layout/Overlays",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const PopoverStory: Story = {
    name: "Popover",
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <DocPage title="Popover" intro="A small panel attached to a control. The page stays live. It does not travel from the edge or stop the page.">
                <DocSection title="Example">
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Popover
                            open={open}
                            title="Status"
                            trigger={
                                <Button variant="secondary" onClick={() => setOpen((current) => !current)}>
                                    Filter
                                </Button>
                            }
                            onClose={() => setOpen(false)}
                        >
                            <p>Active and invited stay in the list.</p>
                            <Button
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                Apply
                            </Button>
                        </Popover>
                        <p className="text-sm text-muted">Escape or a click outside closes it. The page behind stays usable.</p>
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["A small task that belongs to one control.", "The person should still use the page behind it."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "The page must wait. Use Dialog, or Bottom sheet on a small screen.",
                            "The task needs the full height. Use Drawer.",
                            "A short hint with no actions. Use Tooltip.",
                            "A list of actions only. Use Dropdown.",
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={libraryExportNote} code={popoverSnippet} />
            </DocPage>
        );
    },
};
