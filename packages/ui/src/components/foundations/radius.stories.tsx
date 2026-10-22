import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage } from "./catalog";
import { RadiusExamples } from "./radius-examples";

const radii = [
    ["Sharp", "rounded-none", "0", "Graphic field"],
    ["XS", "rounded-xs", "0.125rem", "Small mark inside a control"],
    ["SM", "rounded-sm", "0.25rem", "Compact chip"],
    ["MD", "rounded-md", "0.375rem", "Controls, fields, and dense panels"],
    ["LG", "rounded-lg", "0.75rem", "Web cards and media"],
    ["XL", "rounded-xl", "1rem", "Large web surface"],
    ["2XL", "rounded-2xl", "1.25rem", "Graphic frame"],
    ["Full", "rounded-full", "pill", "Avatar or pill"],
] as const;

const meta = {
    title: "Foundations/Radius",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
    render: () => (
        <FoundationPage title="Radius" intro="Controls stay on md. Cards step up to lg. A poster can be sharp.">
            <div className="grid grid-cols-2 gap-spacing-04 sm:grid-cols-3 lg:grid-cols-4">
                {radii.map(([name, utility, size, role]) => (
                    <article key={name} className="flex flex-col gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-04">
                        <div className="flex h-spacing-13 items-center justify-center rounded-md bg-canvas">
                            <div className={`${utility} size-spacing-11 bg-accent`} />
                        </div>
                        <div className="flex flex-col gap-spacing-01">
                            <span className="text-sm font-medium">{name}</span>
                            <span className="font-mono text-xs text-muted">
                                {utility} · {size}
                            </span>
                            <span className="text-sm text-muted">{role}</span>
                        </div>
                    </article>
                ))}
            </div>
        </FoundationPage>
    ),
};

export const Examples: Story = {
    render: () => (
        <FoundationPage title="Radius examples">
            <RadiusExamples />
        </FoundationPage>
    ),
};
