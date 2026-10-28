import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, planningSnippet } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { Message } from "../base/message";
import { TextArea } from "../base/text-area";
import { Tabs } from "../navigation/tabs";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { Journey, Mapping, StoryMap } from "./planning-artifacts";
import { journeyText, mappingText, northVisitSource, parsePlanningSource, planningSourceText, storyMapText } from "./planning-source";

const meta = {
    title: "Patterns/Planning",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Planning: Story = {
    name: "Planning",
    render: () => {
        const [draft, setDraft] = useState(planningSourceText(northVisitSource));
        const [copied, setCopied] = useState<string | null>(null);
        const parsed = parsePlanningSource(draft);
        const lastValid = useRef(northVisitSource);
        if (parsed.source) {
            lastValid.current = parsed.source;
        }
        const source = lastValid.current;

        async function copy(label: string, text: string) {
            try {
                await navigator.clipboard.writeText(text);
                setCopied(label);
                window.setTimeout(() => setCopied(null), 2000);
            } catch {
                window.alert(`Could not copy the ${label}.`);
            }
        }

        return (
            <DocPage title="Planning" intro="A journey shows friction. A story map turns that friction into work and a first release. Both read the same labeled source.">
                <DocSection title="Example">
                    <DocParagraph>
                        Ada reviews a visit. The source is a fictional illustration, not client work. The one thought on the journey is labeled an assumption. Edit the JSON and the map, the journey, and the mapping change together.
                    </DocParagraph>
                    <DocDemo>
                        <div className="flex flex-col gap-spacing-05">
                            <TextArea
                                label="Source"
                                hint="JSON. Illustration and assumption stay in the file."
                                error={parsed.error ?? undefined}
                                rows={14}
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                            />
                            {parsed.error ? null : (
                                <Message title="Source" tone="neutral">
                                    {source.note}
                                </Message>
                            )}
                            <Tabs
                                defaultValue="map"
                                items={[
                                    { value: "map", label: "Story map", content: <StoryMap source={source} /> },
                                    { value: "journey", label: "Journey", content: <Journey source={source} /> },
                                    { value: "mapping", label: "Mapping", content: <Mapping source={source} /> },
                                ]}
                            />
                            <div className="flex flex-wrap gap-spacing-03">
                                <Button variant="secondary" size="dense" onClick={() => void copy("story map", storyMapText(source))}>
                                    {copied === "story map" ? "Copied story map" : "Copy story map"}
                                </Button>
                                <Button variant="secondary" size="dense" onClick={() => void copy("journey", journeyText(source))}>
                                    {copied === "journey" ? "Copied journey" : "Copy journey"}
                                </Button>
                                <Button variant="secondary" size="dense" onClick={() => void copy("mapping", mappingText(source))}>
                                    {copied === "mapping" ? "Copied mapping" : "Copy mapping"}
                                </Button>
                                <Button variant="ghost" size="dense" onClick={() => setDraft(planningSourceText(northVisitSource))}>
                                    Reset source
                                </Button>
                            </div>
                        </div>
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets
                        items={[
                            "You have one person, one goal, and you need both the path they take and the work it implies.",
                            "A first release should be a thin path across the whole story, not a pile of later details.",
                        ]}
                    />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "A precise workflow or state machine. Use a diagram made for that.",
                            "A queue of live work. Use Task management.",
                        ]}
                    />
                </DocSection>
                <DocSection title="How they relate">
                    <DocParagraph>
                        Each journey stage names an opportunity. Stories on the map point at the same opportunity. MVP is the smallest path that lets Ada finish; Later holds filters and the next visit.
                    </DocParagraph>
                </DocSection>
                <DocCodeSection note={compositionNote} code={planningSnippet} />
            </DocPage>
        );
    },
};
