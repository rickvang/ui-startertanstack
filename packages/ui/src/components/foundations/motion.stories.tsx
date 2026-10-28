import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../base/button";
import { Switch } from "../base/switch";
import { FoundationPage, FoundationSection } from "./catalog";

const durations = [
    ["100", "--motion-duration-100", "100ms", "Leave."],
    ["150", "--motion-duration-150", "150ms", "Feedback."],
    ["200", "--motion-duration-200", "200ms", "Enter."],
    ["300", "--motion-duration-300", "300ms", "Travel."],
] as const;

const easings = [
    ["Standard", "--motion-ease-standard", "ease-standard", "In and out. A control that stays on screen."],
    ["Enter", "--motion-ease-enter", "ease-enter", "Ease out. Arrival without overshoot."],
    ["Leave", "--motion-ease-leave", "ease-leave", "Ease in. Exit, shorter than the arrival."],
    ["Spring", "--motion-ease-spring", "ease-spring", "A curve with overshoot. Not a physics solver."],
] as const;

const distances = [
    ["Nudge", "--motion-distance-nudge", "0.25rem", "A notice or a line of content."],
    ["Shift", "--motion-distance-shift", "0.5rem", "A slightly larger arrival."],
    ["Own width", "translate-x-full", "100%", "A drawer. The distance is the panel, not a fixed length."],
] as const;

const roles = [
    ["Feedback", "motion-feedback", "150ms · standard", "None", "None", "Press 0.98", "Color, shadow, or a press on a control that stays put."],
    ["Enter", "motion-enter", "200ms · spring", "Nudge", "Soft, then clear", "0.96 to 1", "Something arriving."],
    ["Leave", "motion-leave", "100ms · leave", "Nudge", "Clear, then soft", "1 to 0.96", "Something leaving. Shorter, so it does not hold attention."],
    ["Travel", "motion-travel", "300ms · spring", "Measured, or the panel width", "None", "None", "A region moving: a tab mark, a switch thumb, a drawer."],
] as const;

function EaseSample({ ease }: { ease: (typeof easings)[number][2] }) {
    const [on, setOn] = useState(false);

    return (
        <button type="button" className="flex h-spacing-08 items-center rounded-md bg-canvas px-spacing-03" onClick={() => setOn((current) => !current)}>
            <span className={`size-spacing-04 rounded-full bg-accent motion-reduce:transition-none ${on ? "translate-x-spacing-10" : "translate-x-0"} transition-transform duration-300 ${ease}`} />
        </button>
    );
}

function Notice({ shown }: { shown: boolean }) {
    const motion = shown
        ? "translate-y-0 scale-100 opacity-100 blur-none motion-enter"
        : "pointer-events-none translate-y-spacing-02 scale-[var(--motion-scale-enter)] opacity-0 blur-soft motion-leave";

    return (
        <div className="flex h-spacing-11 items-center overflow-hidden">
            <div className={`w-full rounded-md border border-line bg-surface px-spacing-04 py-spacing-03 text-sm text-ink transition-[opacity,transform,filter] motion-reduce:transition-none motion-reduce:blur-none ${motion}`}>
                Alex Kim joined Members.
            </div>
        </div>
    );
}

const meta = {
    title: "Foundations/Motion",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primitives: Story = {
    render: () => (
        <FoundationPage title="Motion primitives" intro="Durations, easings, distance, blur, and scale stay fixed in light and dark. Product UI uses the semantic roles.">
            <FoundationSection title="Duration">
                <div className="overflow-hidden rounded-lg border border-line bg-surface">
                    {durations.map(([name, variable, time, role]) => (
                        <div key={name} className="grid gap-spacing-02 border-b border-line px-spacing-05 py-spacing-04 last:border-b-0 md:grid-cols-[8rem_1fr]">
                            <span className="text-sm font-medium">{name}</span>
                            <span className="font-mono text-xs text-muted">
                                {variable} · {time} · {role}
                            </span>
                        </div>
                    ))}
                </div>
            </FoundationSection>
            <FoundationSection title="Easing">
                <div className="grid gap-spacing-04 md:grid-cols-2">
                    {easings.map(([name, variable, utility, role]) => (
                        <article key={name} className="flex flex-col gap-spacing-03 rounded-lg border border-line bg-surface p-spacing-05">
                            <span className="text-sm font-medium">{name}</span>
                            <span className="font-mono text-xs text-muted">
                                {variable} · {utility}
                            </span>
                            <p className="text-sm text-muted">{role}</p>
                            <EaseSample ease={utility} />
                        </article>
                    ))}
                </div>
            </FoundationSection>
            <FoundationSection title="Distance, blur, and scale">
                <div className="grid gap-spacing-04 md:grid-cols-3">
                    {distances.map(([name, variable, time, role]) => (
                        <article key={name} className="flex flex-col gap-spacing-02 rounded-lg border border-line bg-surface p-spacing-05">
                            <span className="text-sm font-medium">{name}</span>
                            <span className="font-mono text-xs text-muted">
                                {variable} · {time}
                            </span>
                            <p className="text-sm text-muted">{role}</p>
                        </article>
                    ))}
                    <article className="flex flex-col gap-spacing-02 rounded-lg border border-line bg-surface p-spacing-05">
                        <span className="text-sm font-medium">Soft blur</span>
                        <span className="font-mono text-xs text-muted">--motion-blur-soft · blur-soft · 2px</span>
                        <p className="text-sm text-muted">A short veil on enter and leave. Not a fill.</p>
                    </article>
                    <article className="flex flex-col gap-spacing-02 rounded-lg border border-line bg-surface p-spacing-05">
                        <span className="text-sm font-medium">Press</span>
                        <span className="font-mono text-xs text-muted">--motion-scale-press · 0.98</span>
                        <p className="text-sm text-muted">A button that is held down.</p>
                    </article>
                    <article className="flex flex-col gap-spacing-02 rounded-lg border border-line bg-surface p-spacing-05">
                        <span className="text-sm font-medium">Enter scale</span>
                        <span className="font-mono text-xs text-muted">--motion-scale-enter · 0.96</span>
                        <p className="text-sm text-muted">Something arriving or leaving. It does not bounce past full size.</p>
                    </article>
                </div>
            </FoundationSection>
        </FoundationPage>
    ),
};

export const Semantic: Story = {
    render: () => (
        <FoundationPage title="Semantic motion" intro="Each role is one class. It sets the duration and the easing together. A large move keeps travel on the way out, because leave is too short for a panel width.">
            <FoundationSection title="Principles">
                <div className="grid gap-spacing-04 md:grid-cols-3">
                    {[
                        ["Justified", "If the motion does not show where something went, or that a control responded, leave it still."],
                        ["Short", "A leave is shorter than an enter. A drawer still uses travel for the slide, because the distance is the panel."],
                        ["Named properties", "Move opacity, transform, and a soft blur. Do not use transition-all. Spring is the overshoot curve, not a solver."],
                    ].map(([title, body]) => (
                        <article key={title} className="flex flex-col gap-spacing-02 rounded-lg border border-line bg-surface p-spacing-05">
                            <h3 className="text-sm font-medium">{title}</h3>
                            <p className="text-sm text-muted">{body}</p>
                        </article>
                    ))}
                </div>
            </FoundationSection>
            <div className="overflow-x-auto rounded-lg border border-line bg-surface">
                <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-line text-ink">
                            {["Role", "Class", "Pair", "Distance", "Blur", "Scale", "Use"].map((header) => (
                                <th key={header} scope="col" className="px-spacing-04 py-spacing-03 font-medium">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((row) => (
                            <tr key={row[0]} className="border-b border-line last:border-b-0">
                                {row.map((cell, index) => (
                                    <td key={`${row[0]}-${index}`} className={`px-spacing-04 py-spacing-03 align-top text-muted ${index === 1 ? "whitespace-nowrap font-mono text-xs" : ""}`}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </FoundationPage>
    ),
};

export const Examples: Story = {
    render: () => {
        const [shown, setShown] = useState(true);

        return (
            <FoundationPage title="Motion examples" intro="Feedback is a button. Enter and leave are one notice. Travel is the switch thumb. The jobs — drawer, tabs, a card, loading — are the recipes.">
                <FoundationSection title="Feedback">
                    <div className="flex items-center gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-05">
                        <Button>Save</Button>
                        <p className="text-sm text-muted">Color and a 0.98 press. motion-feedback is 150ms and the standard curve.</p>
                    </div>
                </FoundationSection>
                <FoundationSection title="Enter and leave">
                    <div className="flex max-w-sm flex-col gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-05">
                        <Button variant="secondary" onClick={() => setShown((current) => !current)}>
                            {shown ? "Hide" : "Show"}
                        </Button>
                        <Notice shown={shown} />
                    </div>
                </FoundationSection>
                <FoundationSection title="Travel">
                    <div className="flex items-center gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-05">
                        <Switch label="Annual billing" />
                        <p className="text-sm text-muted">The thumb uses motion-travel. The color uses motion-feedback.</p>
                    </div>
                </FoundationSection>
                <FoundationSection title="Reduced motion">
                    <p className="max-w-2xl text-sm text-muted">motion-reduce:transition-none on a transition, or motion-reduce:animate-none on an animation. Blur and scale drop out with the transition. The change is instant. The button, the switch, and the loader already do this.</p>
                </FoundationSection>
            </FoundationPage>
        );
    },
};
