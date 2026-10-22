import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage } from "./catalog";
import { SpacingExamples, SpacingUsage } from "./spacing-guidelines";
import { spacingScale } from "./spacing-scale";

const meta = {
    title: "Foundations/Spacing",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
    render: () => (
        <FoundationPage title="Spacing" intro="Use these steps for margin, padding, and gap. The same steps size width and height.">
            <div className="overflow-hidden rounded-lg border border-line bg-surface">
                {spacingScale.map((step) => (
                    <div key={step.token} className="grid grid-cols-[9rem_1fr] items-center gap-spacing-05 border-b border-line px-spacing-05 py-spacing-04 last:border-b-0">
                        <div className="flex flex-col gap-spacing-01">
                            <span className="font-mono text-xs text-ink">{step.token}</span>
                            <span className="font-mono text-xs text-muted">
                                {step.px} · {step.rem}
                            </span>
                        </div>
                        <div className={`${step.width} h-spacing-03 rounded-full bg-accent`} />
                    </div>
                ))}
            </div>
        </FoundationPage>
    ),
};

export const Usage: Story = {
    render: () => (
        <FoundationPage title="Spacing usage">
            <SpacingUsage />
        </FoundationPage>
    ),
};

export const Examples: Story = {
    render: () => (
        <FoundationPage title="Spacing examples">
            <SpacingExamples />
        </FoundationPage>
    ),
};
