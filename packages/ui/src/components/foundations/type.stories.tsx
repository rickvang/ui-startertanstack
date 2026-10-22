import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, FoundationSection } from "./catalog";
import { TypeExamples } from "./type-examples";

const scale = [
    ["Poster", "text-display-2xl font-bold", "4.5rem / 5rem", "Graphic title"],
    ["Cover", "text-display-xl font-bold", "3.75rem / 4.5rem", "Graphic title"],
    ["Hero", "text-display-lg font-semibold", "3rem / 3.5rem", "Large web title"],
    ["Hero small", "text-display-md font-semibold", "2.25rem / 2.75rem", "Large web title"],
    ["Page", "text-display-sm font-semibold", "1.875rem / 2.375rem", "Page title"],
    ["Cover line", "text-display-xs font-normal", "1.5rem / 2rem", "Subtitle under a graphic title"],
    ["Card", "text-xl font-semibold", "1.25rem / 1.75rem", "Card title"],
    ["Section", "text-lg font-semibold", "1.125rem / 1.75rem", "Section title"],
    ["Reading", "text-md font-normal", "1rem / 1.5rem", "Web body"],
    ["UI", "text-sm font-medium", "0.875rem / 1.25rem", "Controls, labels, and product text"],
    ["Meta", "text-xs font-normal", "0.75rem / 1rem", "Captions and token names"],
] as const;

const weights = [
    ["Regular", "font-normal", "Reading text, values, and cover lines"],
    ["Medium", "font-medium", "Labels, buttons, and kickers"],
    ["Semibold", "font-semibold", "UI titles, section titles, and page titles"],
    ["Bold", "font-bold", "Graphic titles"],
] as const;

const meta = {
    title: "Foundations/Type",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
    render: () => (
        <FoundationPage title="Type" intro="Display sizes are for pages and posters. Product text stays on the UI size.">
            <div className="overflow-hidden rounded-lg border border-line bg-surface">
                {scale.map(([name, utility, size, role]) => (
                    <div key={name} className="grid items-baseline gap-x-spacing-06 gap-y-spacing-02 border-b border-line px-spacing-05 py-spacing-05 last:border-b-0 md:grid-cols-[minmax(0,1fr)_16rem]">
                        <p className={`${utility} min-w-0 text-ink`}>{name}</p>
                        <div className="flex flex-col gap-spacing-01">
                            <span className="text-sm text-ink">{role}</span>
                            <span className="font-mono text-xs text-muted">
                                {size}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </FoundationPage>
    ),
};

export const Weights: Story = {
    render: () => (
        <FoundationPage title="Type weights" intro="Four weights. Regular for reading, medium for labels, semibold for titles, bold for a poster.">
            <FoundationSection title="Sans">
                <div className="overflow-hidden rounded-lg border border-line bg-surface">
                    {weights.map(([name, utility, role]) => (
                        <div key={name} className="grid items-baseline gap-x-spacing-06 gap-y-spacing-02 border-b border-line px-spacing-05 py-spacing-05 last:border-b-0 md:grid-cols-[minmax(0,1fr)_16rem]">
                            <p className={`${utility} text-xl text-ink`}>North keeps the work together.</p>
                            <div className="flex flex-col gap-spacing-01">
                                <span className="text-sm text-ink">{name}</span>
                                <span className="text-sm text-muted">{role}</span>
                                <span className="font-mono text-xs text-muted">{utility}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </FoundationSection>
            <FoundationSection title="Mono">
                <div className="rounded-lg border border-line bg-surface px-spacing-05 py-spacing-05">
                    <p className="font-mono text-sm text-ink">spacing-07 · 32px</p>
                    <p className="mt-spacing-02 text-sm text-muted">Labels, token names, and code.</p>
                </div>
            </FoundationSection>
        </FoundationPage>
    ),
};

export const Examples: Story = {
    render: () => (
        <FoundationPage title="Type examples">
            <TypeExamples />
        </FoundationPage>
    ),
};
