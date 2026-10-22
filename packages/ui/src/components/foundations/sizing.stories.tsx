import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage } from "./catalog";
import { SizingExamples } from "./sizing-examples";
import { spacingScale } from "./spacing-scale";

const meta = {
    title: "Foundations/Sizing",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
    render: () => (
        <FoundationPage title="Sizing" intro="Width and height use the spacing steps. A dense control is spacing-06, 24px. Standard is spacing-07, 32px. Wide is spacing-08, 40px.">
            <div className="flex flex-wrap items-end gap-spacing-05 rounded-lg border border-line bg-surface p-spacing-06">
                {spacingScale.map((step) => (
                    <div key={step.token} className="flex flex-col items-center gap-spacing-03">
                        <div className={`${step.size} rounded-sm bg-accent`} />
                        <span className="text-center font-mono text-xs text-muted">{step.px}</span>
                    </div>
                ))}
            </div>
        </FoundationPage>
    ),
};

export const Examples: Story = {
    render: () => (
        <FoundationPage title="Sizing examples">
            <SizingExamples />
        </FoundationPage>
    ),
};
