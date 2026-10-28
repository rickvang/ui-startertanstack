import type { Meta, StoryObj } from "@storybook/react-vite";
import { autodocsComponentParameters } from "../../../.storybook/copyable-snippets";
import { docsFromSnippet, loaderSnippet } from "../../../.storybook/story-snippets";
import { FoundationPage } from "../foundations/catalog";
import { Loader, type LoaderVariant } from "./loader";

const variations = [
    ["Record", "record", "A person or a row. A picture beside a few lines."],
    ["Text", "text", "A paragraph. Lines only, in a few lengths."],
    ["Media", "media", "A card. A block for the picture, then two lines."],
    ["Circle", "circle", "A dot travels a figure 8 and eases through the crossing."],
] as const satisfies ReadonlyArray<readonly [string, LoaderVariant, string]>;

const meta = {
    tags: ["autodocs"],
    parameters: { ...autodocsComponentParameters, layout: "fullscreen" },
    title: "Components/Loader",
    component: Loader,
    args: {
        label: "Loading",
        children: null,
    },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
    ...docsFromSnippet(loaderSnippet),
    render: () => (
        <FoundationPage title="Loader" intro="A skeleton stands in for content that has not arrived. Use the shape of what is coming, and let the whole shape breathe brighter, then quieter. The circle sends a dot around a figure 8, easing through the crossing.">
            <div className="grid gap-spacing-04 sm:grid-cols-2">
                {variations.map(([name, variant, role]) => (
                    <article key={variant} className="flex flex-col gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-04">
                        <div className="flex min-h-spacing-13 items-center rounded-md bg-canvas p-spacing-05">
                            <Loader variant={variant} />
                        </div>
                        <div className="flex flex-col gap-spacing-01">
                            <span className="text-sm font-medium">{name}</span>
                            <span className="font-mono text-xs text-muted">{variant}</span>
                            <span className="text-sm text-muted">{role}</span>
                        </div>
                    </article>
                ))}
            </div>
        </FoundationPage>
    ),
};

