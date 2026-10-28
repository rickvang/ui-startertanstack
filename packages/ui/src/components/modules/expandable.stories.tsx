import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expandableSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { Switch } from "../base/switch";
import { Expandable } from "../layout/expandable";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocRows, DocSection } from "../templates/doc";
import { DetailCard } from "./detail-card";

const meta = {
    title: "Modules/Detail",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ExpandableStory: Story = {
    name: "Expandable",
    render: () => {
        const [open, setOpen] = useState(false);
        const [reduce, setReduce] = useState(false);

        return (
            <DocPage title="Expandable" intro="The title stays. The extra fields ease open, and the words fade. Height uses grid rows, not a width and height tween.">
                <DocSection title="Example">
                    <DocDemo>
                        <Switch label="Reduced motion" checked={reduce} onCheckedChange={setReduce} />
                        <DetailCard title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary" onClick={() => setOpen((current) => !current)}>{open ? "Less" : "More"}</Button>}>
                            <p>Owner</p>
                            <Expandable open={open} reduceMotion={reduce}>
                                <p className="pt-spacing-03">Last visit was today. Can invite members. North team.</p>
                            </Expandable>
                        </DetailCard>
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["A few more facts belong on the same card.", "The title and status should stay put while the body grows."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets items={["A new page of fields. Use a record pattern.", "A table row. That expand is separate from this region."]} />
                </DocSection>
                <DocSection title="Motion">
                    <DocRows
                        headers={["Part", "Role"]}
                        rows={[
                            { label: "Shell", detail: "grid-rows 0fr to 1fr, motion-fade. The height decelerates." },
                            { label: "Contents", detail: "Opacity only. motion-fade on the way in, motion-leave on the way out." },
                            { label: "Reduced motion", detail: "The extra fields appear and disappear at once." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={libraryExportNote} code={expandableSnippet} />
            </DocPage>
        );
    },
};
