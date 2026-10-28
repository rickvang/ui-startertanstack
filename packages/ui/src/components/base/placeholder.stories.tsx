import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, placeholderSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocRows, DocSection } from "../templates/doc";
import { Button } from "./button";
import { Loader } from "./loader";
import { Placeholder } from "./placeholder";
import { Switch } from "./switch";

const meta = {
    title: "Components/Placeholder",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const PlaceholderStory: Story = {
    name: "Placeholder",
    render: () => {
        const [ready, setReady] = useState(false);
        const [snap, setSnap] = useState(false);
        const [reduce, setReduce] = useState(false);

        function replay() {
            setSnap(true);
            setReady(false);
            window.setTimeout(() => {
                setSnap(false);
                window.setTimeout(() => setReady(true), 700);
            }, 40);
        }

        return (
            <DocPage title="Placeholder" intro="The skeleton and the result share one slot. The bones keep their pulse. The skeleton leaves, and the content enters. Replay does not animate backwards.">
                <DocSection title="Example">
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Switch label="Reduced motion" checked={reduce} onCheckedChange={setReduce} />
                        <div className="flex gap-spacing-03">
                            <Button variant="secondary" onClick={() => setReady(true)} disabled={ready}>
                                Show content
                            </Button>
                            <Button variant="ghost" onClick={replay}>
                                Replay
                            </Button>
                        </div>
                        <div className="w-full max-w-sm">
                            <Placeholder ready={ready} snap={snap} reduceMotion={reduce} placeholder={<Loader label="Loading member" />}>
                                <p className="text-sm text-ink">Alex Kim, owner. Last visit today.</p>
                            </Placeholder>
                        </div>
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["The shape of the result is known before the data arrives.", "The person should see the result arrive, not the bones turn into type."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets items={["A button that is saving. Use the pending form.", "A meter of real time. That can be linear. This cross-fade is not."]} />
                </DocSection>
                <DocSection title="Motion">
                    <DocRows
                        headers={["Part", "Role"]}
                        rows={[
                            { label: "Skeleton", detail: "Loader pulse on the bones. Leave is motion-leave and blur-soft." },
                            { label: "Content", detail: "motion-enter, nudge, blur clear, scale enter." },
                            { label: "Replay", detail: "snap drops the transition, then the content enters again." },
                            { label: "Reduced motion", detail: "The skeleton swaps for the content with no blur and no travel." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={libraryExportNote} code={placeholderSnippet} />
            </DocPage>
        );
    },
};
