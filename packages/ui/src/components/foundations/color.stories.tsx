import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorExamples } from "./color-examples";
import { FoundationPage, FoundationSection } from "./catalog";

const steps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

const palettes = [
    { name: "Neutral", variable: "--neutral" },
    { name: "Brand", variable: "--brand" },
    { name: "Danger", variable: "--danger" },
    { name: "Warning", variable: "--warning" },
    { name: "Success", variable: "--success" },
] as const;

const semantic = [
    ["Canvas", "--canvas", "bg-canvas", "Page ground. Type on an ink field."],
    ["Surface", "--surface", "bg-surface", "Panels in product UI and web pages."],
    ["Ink", "--ink", "text-ink", "Primary text. The field of a graphic."],
    ["Muted", "--muted", "text-muted", "Secondary text in product UI and web pages."],
    ["Line", "--line", "border-line", "Borders and dividers. Not used on a graphic field."],
    ["Selected", "--selected", "bg-selected", "Selected row in a table or list."],
    ["Accent", "--accent", "bg-accent", "Primary action and graphic mark."],
    ["Accent hover", "--accent-hover", "bg-accent-hover", "Hover and pressed action."],
    ["Accent subtle", "--accent-subtle", "bg-accent-subtle", "Tinted note. Not a selected row."],
    ["Accent foreground", "--accent-fg", "text-accent-fg", "Type on accent."],
    ["Danger", "--danger", "text-danger", "Error text."],
    ["Danger subtle", "--danger-subtle", "bg-danger-subtle", "Error fill."],
    ["Warning", "--warning", "text-warning", "Warning text."],
    ["Warning subtle", "--warning-subtle", "bg-warning-subtle", "Warning fill."],
    ["Success", "--success", "text-success", "Success text."],
    ["Success subtle", "--success-subtle", "bg-success-subtle", "Success fill."],
    ["Focus", "--focus", "outline-focus", "Focus ring on a control."],
    ["Overlay", "--overlay", "bg-overlay", "Backdrop behind a modal."],
] as const;

const meta = {
    title: "Foundations/Color",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primitives: Story = {
    render: () => (
        <FoundationPage title="Color primitives" intro="Ramps stay fixed in light and dark. Product UI, web pages, and graphic assets use the semantic tokens.">
            {palettes.map((palette) => (
                <FoundationSection key={palette.name} title={palette.name}>
                    <div className="overflow-x-auto">
                        <div className="min-w-[44rem] overflow-hidden rounded-lg border border-line bg-surface">
                            <div className="grid grid-cols-11">
                                {steps.map((step) => (
                                    <div key={step} className="h-spacing-12" style={{ background: `var(${palette.variable}-${step})` }} />
                                ))}
                            </div>
                            <div className="grid grid-cols-11 py-spacing-03">
                                {steps.map((step) => (
                                    <span key={step} className="text-center font-mono text-xs text-muted">
                                        {step}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </FoundationSection>
            ))}
        </FoundationPage>
    ),
};

function SemanticSwatch({ variable }: { variable: string }) {
    if (variable === "--overlay") {
        return (
            <div className="relative h-spacing-12 bg-accent">
                <div className="absolute inset-0" style={{ background: "var(--overlay)" }} />
            </div>
        );
    }

    return <div className="h-spacing-12" style={{ background: `var(${variable})` }} />;
}

export const Semantic: Story = {
    render: () => (
        <FoundationPage title="Semantic color" intro="One set of roles for dense product UI, web pages, and graphic assets. Switch the theme toolbar to see the dark mapping.">
            <div className="grid grid-cols-2 gap-spacing-04 lg:grid-cols-3">
                {semantic.map(([name, variable, utility, usage]) => (
                    <article key={name} className="overflow-hidden rounded-lg border border-line bg-surface">
                        <SemanticSwatch variable={variable} />
                        <div className="flex flex-col gap-spacing-02 p-spacing-04">
                            <span className="text-sm font-medium text-ink">{name}</span>
                            <span className="font-mono text-xs text-muted">{utility}</span>
                            <span className="text-sm text-muted">{usage}</span>
                        </div>
                    </article>
                ))}
            </div>
        </FoundationPage>
    ),
};

export const Examples: Story = {
    render: () => (
        <FoundationPage title="Color examples">
            <ColorExamples />
        </FoundationPage>
    ),
};
