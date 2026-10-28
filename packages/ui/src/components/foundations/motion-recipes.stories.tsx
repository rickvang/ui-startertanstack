import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../base/button";
import { Loader } from "../base/loader";
import { Switch } from "../base/switch";
import { Drawer } from "../layout/drawer";
import { DetailCard } from "../modules/detail-card";
import { Tabs } from "../navigation/tabs";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocRows, DocSection } from "../templates/doc";

const recipeNote = "**Catalog recipe** — classes on the semantic roles. Not a package export, and not a transitions.dev snippet.";

const drawerCode = `overlay, opening: transition-opacity duration-enter ease-enter
overlay, closing: transition-opacity duration-leave ease-leave
panel: transition-[transform,opacity,filter] duration-travel ease-spring
panel open: translate-x-0 scale-100 opacity-100 blur-none
panel closed: translate-x-full scale-[var(--motion-scale-enter)] opacity-0 blur-soft
reduced: transition-none`;

const tabCode = `mark: transition-[transform,width] duration-travel ease-spring
label: transition-colors duration-feedback ease-standard
panel: animate-motion-enter
first paint and resize: transition-none, then travel
reduced: transition-none and animate-none`;

const cardCode = `shell: transition-[grid-template-rows] duration-travel ease-spring
open: grid-rows-[1fr]
closed: grid-rows-[0fr]
contents open: duration-enter ease-spring, nudge and blur clear, scale 1
contents close: duration-leave ease-leave, nudge, blur-soft, scale enter`;

const loadingCode = `same slot, two layers
bones keep the loader pulse
skeleton leave: duration-leave ease-leave, blur-soft
content enter: duration-enter ease-spring, nudge, blur clear, scale 1
replay: transition-none back to the skeleton, then enter again`;

function Reduce({ on, onChange }: { on: boolean; onChange: (next: boolean) => void }) {
    return <Switch label="Reduced motion" checked={on} onCheckedChange={onChange} />;
}

const meta = {
    title: "Foundations/Motion",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Recipes: Story = {
    name: "Recipes",
    render: () => (
        <DocPage title="Motion recipes" intro="Pick the job. The roles stay on Semantic. The page shape — purpose, a live preview, then the classes — follows transitions.dev. The durations, spring curve, blur, and scale are these tokens.">
            <DocSection title="How to choose">
                <DocParagraph>A control that only changes color stays on Examples. These four are changes of place, selection, size, or arrival.</DocParagraph>
                <DocRows
                    headers={["Job", "Open"]}
                    rows={[
                        { label: "A panel from the edge", detail: "Drawer reveal. The Drawer component owns the motion." },
                        { label: "Another tab", detail: "Tab change. The underline travels. Tabs owns the motion." },
                        { label: "More on the same card", detail: "Card expansion. The title stays. The extra fields open." },
                        { label: "Content replacing a skeleton", detail: "Loading to content. The bones and the result share one slot." },
                    ]}
                />
            </DocSection>
        </DocPage>
    ),
};

export const DrawerReveal: Story = {
    name: "Drawer reveal",
    render: () => {
        const [open, setOpen] = useState(false);
        const [reduce, setReduce] = useState(false);

        return (
            <DocPage title="Drawer reveal" intro="The panel travels its own width. Opacity, a soft blur, and a small scale come with it. The overlay fades.">
                <DocSection title="Example">
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Reduce on={reduce} onChange={setReduce} />
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
                <DocSection title="Recipe">
                    <DocRows
                        headers={["Fact", "Value"]}
                        rows={[
                            { label: "Trigger", detail: "Open, Close, the overlay, or Escape." },
                            { label: "States", detail: "Closed, traveling, open. Unmount waits for travel." },
                            { label: "Panel", detail: "duration-travel, ease-spring, translate-x-full, blur-soft, scale enter." },
                            { label: "Overlay", detail: "duration-enter on the way in, duration-leave on the way out." },
                            { label: "Reduced motion", detail: "Instant. Focus still moves to Close and back." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={recipeNote} code={drawerCode} />
            </DocPage>
        );
    },
};

export const TabChange: Story = {
    name: "Tab change",
    render: () => {
        const [reduce, setReduce] = useState(false);

        return (
            <DocPage title="Tab change" intro="The underline measures the active tab and travels. The label uses feedback. The panel enters. The first paint snaps, so the mark does not slide in from zero.">
                <DocSection title="Example">
                    <DocDemo>
                        <Reduce on={reduce} onChange={setReduce} />
                        <Tabs
                            reduceMotion={reduce}
                            defaultValue="members"
                            items={[
                                { value: "members", label: "Members", content: "Alex Kim, Jordan Lee, Sam Patel" },
                                { value: "access", label: "Access", content: "Who can invite, and who can remove a project." },
                                { value: "activity", label: "Activity", content: "Last visit was today." },
                            ]}
                        />
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["The sections are peers on one surface.", "The person should see which tab is current while the mark moves."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets items={["A route change. Use the shell.", "A pill bar from another system. These tabs stay an underline."]} />
                </DocSection>
                <DocSection title="Recipe">
                    <DocRows
                        headers={["Fact", "Value"]}
                        rows={[
                            { label: "Trigger", detail: "Click a tab. Resize snaps, then travel is allowed again." },
                            { label: "Mark", detail: "offsetLeft and offsetWidth. duration-travel, ease-spring." },
                            { label: "Label", detail: "duration-feedback, ease-standard." },
                            { label: "Panel", detail: "animate-motion-enter: nudge, blur-soft, scale enter." },
                            { label: "Reduced motion", detail: "The mark jumps. The panel does not play the enter animation." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={recipeNote} code={tabCode} />
            </DocPage>
        );
    },
};

export const CardExpansion: Story = {
    name: "Card expansion",
    render: () => {
        const [open, setOpen] = useState(false);
        const [reduce, setReduce] = useState(false);
        const shell = reduce ? "transition-none" : "transition-[grid-template-rows] duration-travel ease-spring motion-reduce:transition-none";
        const contents = reduce
            ? "transition-none"
            : open
              ? "transition-[opacity,transform,filter] duration-enter ease-spring motion-reduce:transition-none"
              : "transition-[opacity,transform,filter] duration-leave ease-leave motion-reduce:transition-none";
        const pose = open ? "translate-y-0 scale-100 opacity-100 blur-none" : "translate-y-spacing-02 scale-[var(--motion-scale-enter)] opacity-0 blur-soft";

        return (
            <DocPage title="Card expansion" intro="The title stays. Extra fields open in place. Height uses grid rows, not a width and height tween.">
                <DocSection title="Example">
                    <DocDemo>
                        <Reduce on={reduce} onChange={setReduce} />
                        <DetailCard title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary" onClick={() => setOpen((current) => !current)}>{open ? "Less" : "More"}</Button>}>
                            <p>Owner</p>
                            <div className={`grid ${shell} ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                <div className="overflow-hidden">
                                    <div className={`${contents} ${pose} pt-spacing-03`}>
                                        <p>Last visit was today. Can invite members. North team.</p>
                                    </div>
                                </div>
                            </div>
                        </DetailCard>
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["A few more facts belong on the same card.", "The title and status should stay put while the body grows."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets items={["A new page of fields. Use a record pattern.", "A table row. That expand is a later recipe."]} />
                </DocSection>
                <DocSection title="Recipe">
                    <DocRows
                        headers={["Fact", "Value"]}
                        rows={[
                            { label: "Trigger", detail: "More or Less." },
                            { label: "Shell", detail: "grid-rows 0fr to 1fr, duration-travel, ease-spring." },
                            { label: "Contents", detail: "Enter and leave, with nudge, blur-soft, and scale enter." },
                            { label: "Reduced motion", detail: "The extra fields appear and disappear at once." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={recipeNote} code={cardCode} />
            </DocPage>
        );
    },
};

export const LoadingToContent: Story = {
    name: "Loading to content",
    render: () => {
        const [ready, setReady] = useState(false);
        const [instant, setInstant] = useState(false);
        const [reduce, setReduce] = useState(false);
        const still = instant || reduce;
        const leave = still ? "transition-none" : "transition-[opacity,filter] duration-leave ease-leave motion-reduce:transition-none";
        const enter = still ? "transition-none" : "transition-[opacity,transform,filter] duration-enter ease-spring motion-reduce:transition-none";

        function replay() {
            setInstant(true);
            setReady(false);
            window.setTimeout(() => {
                setInstant(false);
                window.setTimeout(() => setReady(true), 700);
            }, 40);
        }

        return (
            <DocPage title="Loading to content" intro="The skeleton and the result share one slot. The bones keep their pulse. The skeleton leaves, and the content enters. Replay does not animate backwards.">
                <DocSection title="Example">
                    <DocDemo className="flex flex-col items-start gap-spacing-04">
                        <Reduce on={reduce} onChange={setReduce} />
                        <div className="flex gap-spacing-03">
                            <Button variant="secondary" onClick={() => setReady(true)} disabled={ready}>
                                Show content
                            </Button>
                            <Button variant="ghost" onClick={replay}>
                                Replay
                            </Button>
                        </div>
                        <div className="relative h-spacing-12 w-full max-w-sm">
                            <div className={`absolute inset-0 flex items-center ${leave} ${ready ? "opacity-0 blur-soft" : "opacity-100 blur-none"}`}>
                                <Loader label="Loading member" />
                            </div>
                            <div className={`absolute inset-0 flex items-center text-sm text-ink ${enter} ${ready ? "translate-y-0 scale-100 opacity-100 blur-none" : "translate-y-spacing-02 scale-[var(--motion-scale-enter)] opacity-0 blur-soft"}`}>
                                Alex Kim, owner. Last visit today.
                            </div>
                        </div>
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["The shape of the result is known before the data arrives.", "The person should see the result arrive, not the bones turn into type."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets items={["A button that is saving. Use the pending form.", "A meter of real time. That can be linear. This cross-fade is not."]} />
                </DocSection>
                <DocSection title="Recipe">
                    <DocRows
                        headers={["Fact", "Value"]}
                        rows={[
                            { label: "Trigger", detail: "Data arrives. Replay snaps back, then enters again." },
                            { label: "Skeleton", detail: "Loader pulse on the bones. Leave is duration-leave and blur-soft." },
                            { label: "Content", detail: "duration-enter, ease-spring, nudge, blur clear, scale enter." },
                            { label: "Reduced motion", detail: "The skeleton swaps for the content with no blur and no travel." },
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={recipeNote} code={loadingCode} />
            </DocPage>
        );
    },
};
