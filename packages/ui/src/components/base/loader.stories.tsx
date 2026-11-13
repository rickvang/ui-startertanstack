import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, loaderSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Loader, type LoaderVariant } from "./loader";
import { loaderAgentGuidance } from "./inputs.agent";

const variations = [
    ["Record", "record", "A person or a row. A picture beside a few lines."],
    ["Text", "text", "A paragraph. Lines only, in a few lengths."],
    ["Media", "media", "A card. A block for the picture, then two lines."],
    ["Circle", "circle", "A dot travels a figure 8 and eases through the crossing."],
] as const satisfies ReadonlyArray<readonly [string, LoaderVariant, string]>;

const meta = {
    title: "Components/Loader",
    parameters: {
        layout: "fullscreen",
        agent: loaderAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoaderStory: Story = {
    name: "Loader",
    render: () => (
        <DocPage
            title="Loader"
            intro="A skeleton stands in for content that has not arrived. Use the shape of what is coming. Do not imply the region is empty."
        >
            <DocSection title="Example">
                <DocDemo>
                    <div className="grid gap-spacing-04 sm:grid-cols-2">
                        {variations.map(([name, variant, role]) => (
                            <article key={variant} className="flex flex-col gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-04">
                                <div className="flex min-h-spacing-13 items-center rounded-md bg-canvas p-spacing-05">
                                    <Loader variant={variant} label={`Loading ${name.toLowerCase()}`} />
                                </div>
                                <div className="flex flex-col gap-spacing-01">
                                    <span className="text-sm font-medium text-ink">{name}</span>
                                    <span className="font-mono text-xs text-muted">{variant}</span>
                                    <span className="text-sm text-muted">{role}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Waiting on a response for a region or table rows.", "The shape of the result is known enough to reserve space."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "No items after a successful load. Use Empty state.",
                        "A finished error. Use Message or Table error.",
                        "A brief notice after leaving the work. Use Toast.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={loaderSnippet} />
        </DocPage>
    ),
};
