import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage } from "./catalog";
import { ShadowExamples } from "./shadow-examples";

const shadows = [
    ["None", "", "Dense panel. A border does the separation."],
    ["XS", "shadow-xs", "Resting control, when a border is not enough."],
    ["SM", "shadow-sm", "Web card on the page."],
    ["MD", "shadow-md", "Raised card."],
    ["LG", "shadow-lg", "Menu above the page."],
    ["XL", "shadow-xl", "Dialog, or a graphic object on a page."],
] as const;

const meta = {
    title: "Foundations/Shadow",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
    render: () => (
        <FoundationPage title="Shadow" intro="Dense UI uses a border. A web card uses sm. A menu uses lg. A graphic object on a page uses xl.">
            <div className="grid grid-cols-2 gap-x-spacing-05 gap-y-spacing-07 lg:grid-cols-3">
                {shadows.map(([name, utility, role]) => (
                    <article key={name} className="flex flex-col gap-spacing-04">
                        <div className="flex h-spacing-13 items-center justify-center">
                            <div className={`${utility} size-spacing-11 rounded-lg border border-line bg-surface`} />
                        </div>
                        <div className="flex flex-col gap-spacing-01">
                            <span className="text-sm font-medium">{name}</span>
                            <span className="font-mono text-xs text-muted">{utility || "border only"}</span>
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
        <FoundationPage title="Shadow examples">
            <ShadowExamples />
        </FoundationPage>
    ),
};
