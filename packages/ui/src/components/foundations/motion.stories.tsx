import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../base/button";
import { Loader } from "../base/loader";
import { Switch } from "../base/switch";
import { FoundationPage, FoundationSection } from "./catalog";

const durations = [
    ["Feedback", "duration-150", "ease-in-out", "150ms", "Color, opacity, or shadow on a control that stays put."],
    ["Enter", "duration-200", "ease-out", "200ms", "Something arriving, such as a menu or a disclosure."],
    ["Leave", "duration-100", "ease-in", "100ms", "Something going away. Shorter, so it does not hold attention."],
    ["Travel", "duration-300", "ease-in-out", "300ms", "A region moving, such as the thumb of a switch."],
] as const;

const durationExamples = `
@keyframes example-feedback {
    0%,
    46% {
        background-color: var(--surface);
        color: var(--ink);
        box-shadow: none;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    52.25% {
        background-color: var(--accent);
        color: var(--accent-fg);
        box-shadow: var(--shadow-md);
        animation-timing-function: linear;
    }
    88% {
        background-color: var(--accent);
        color: var(--accent-fg);
        box-shadow: var(--shadow-md);
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    94.25%,
    100% {
        background-color: var(--surface);
        color: var(--ink);
        box-shadow: none;
    }
}

`;

function useToggle(period: number, initial: boolean) {
    const [on, setOn] = useState(initial);
    useEffect(() => {
        const id = window.setInterval(() => setOn((current) => !current), period);
        return () => window.clearInterval(id);
    }, [period]);
    return on;
}

function noticeMotion(shown: boolean) {
    return shown
        ? "translate-y-0 opacity-100 duration-200 ease-out"
        : "pointer-events-none -translate-y-2 opacity-0 duration-100 ease-in";
}

function Notice({ shown, children }: { shown: boolean; children: string }) {
    return (
        <div className="flex h-spacing-11 items-center overflow-hidden rounded-md bg-canvas px-spacing-04">
            <div className={`w-full rounded-md border border-line bg-surface px-spacing-04 py-spacing-03 text-sm text-ink transition motion-reduce:transition-none ${noticeMotion(shown)}`}>
                {children}
            </div>
        </div>
    );
}

function EnterExample() {
    const shown = useToggle(2200, false);
    return <Notice shown={shown}>Alex Kim joined Members.</Notice>;
}

function LeaveExample() {
    const shown = useToggle(2200, true);
    return <Notice shown={shown}>The invite was withdrawn.</Notice>;
}

function TravelExample() {
    const ref = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const id = window.setInterval(() => ref.current?.click(), 2200);
        return () => window.clearInterval(id);
    }, []);
    return (
        <div className="flex h-spacing-11 items-center rounded-md bg-canvas px-spacing-04">
            <Switch ref={ref} label="Annual billing" />
        </div>
    );
}

function ColorExample() {
    const on = useToggle(1600, false);
    return (
        <div
            className={`flex min-h-spacing-13 items-center justify-center rounded-lg border border-line text-sm font-medium transition-colors duration-150 ease-in-out motion-reduce:transition-none ${on ? "border-accent bg-accent text-accent-fg" : "bg-surface text-ink"}`}
        >
            Color
        </div>
    );
}

function DurationExample({ duration }: { duration: (typeof durations)[number][1] }) {
    switch (duration) {
        case "duration-150":
            return (
                <div className="flex h-spacing-11 items-center rounded-md bg-canvas px-spacing-04">
                    <span className="rounded-md bg-surface px-spacing-04 py-spacing-02 text-sm font-medium text-ink shadow-none animate-[example-feedback_2.4s_linear_infinite] motion-reduce:animate-none">
                        Save
                    </span>
                </div>
            );
        case "duration-200":
            return <EnterExample />;
        case "duration-100":
            return <LeaveExample />;
        case "duration-300":
            return <TravelExample />;
        default: {
            const exhaustive: never = duration;
            return exhaustive;
        }
    }
}

function Arrive() {
    const [shown, setShown] = useState(true);
    const motion = noticeMotion(shown);

    return (
        <div className="flex flex-col items-start gap-spacing-04">
            <Button variant="secondary" onClick={() => setShown((current) => !current)}>
                {shown ? "Hide" : "Show"}
            </Button>
            <div className={`w-full max-w-sm rounded-md border border-line bg-surface px-spacing-04 py-spacing-03 text-sm text-ink transition motion-reduce:transition-none ${motion}`}>
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

export const Motion: Story = {
    render: () => (
        <FoundationPage title="Motion" intro="Motion explains a change. A control that stays put uses feedback. Something arriving uses enter. Something leaving uses leave. A region changing place uses travel.">
            <FoundationSection title="Principles">
                <div className="grid gap-spacing-04 md:grid-cols-3">
                    {[
                        ["Justified", "If the motion does not show where something went, or that a control responded, leave it still."],
                        ["Short", "Product UI stays fast. A leave is shorter than an enter, and the items leave together."],
                        ["Quiet", "Move opacity and transform. A color change is enough for a control that stays put."],
                    ].map(([title, body]) => (
                        <article key={title} className="flex flex-col gap-spacing-02 rounded-lg border border-line bg-surface p-spacing-05">
                            <h3 className="text-sm font-medium">{title}</h3>
                            <p className="text-sm text-muted">{body}</p>
                        </article>
                    ))}
                </div>
            </FoundationSection>
            <FoundationSection title="Duration">
                <style>{durationExamples}</style>
                <div className="overflow-hidden rounded-lg border border-line bg-surface">
                    {durations.map(([name, duration, easing, time, role]) => (
                        <div key={name} className="grid items-center gap-spacing-05 border-b border-line px-spacing-05 py-spacing-04 last:border-b-0 md:grid-cols-[16rem_1fr]">
                            <div className="flex flex-col gap-spacing-01">
                                <span className="text-sm font-medium">{name}</span>
                                <span className="font-mono text-xs text-muted">
                                    {duration} · {easing} · {time}
                                </span>
                                <span className="text-sm text-muted">{role}</span>
                            </div>
                            <DurationExample duration={duration} />
                        </div>
                    ))}
                </div>
            </FoundationSection>
            <FoundationSection title="Property">
                <div className="grid items-start gap-spacing-05 lg:grid-cols-[minmax(0,1fr)_12rem]">
                    <div className="flex flex-col gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-05 text-sm text-muted">
                        <p>Use transition-colors for a color, transition-opacity for a fade, and transition-transform for a move. Use transition when color and shadow change together, as on a button.</p>
                        <p>Do not use transition-all. It also animates layout, which is slow and distracting.</p>
                        <p>Ease in and out when the element stays on screen. Ease out when it arrives. Ease in when it leaves. Linear is for a meter that represents real time, not for moving a surface.</p>
                    </div>
                    <ColorExample />
                </div>
            </FoundationSection>
            <FoundationSection title="Enter and leave">
                <div className="rounded-lg border border-line bg-surface p-spacing-05">
                    <Arrive />
                </div>
            </FoundationSection>
            <FoundationSection title="Loader">
                <div className="flex flex-col items-start gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-05">
                    <Loader />
                    <p className="max-w-2xl text-sm text-muted">
                        The skeleton stands in for the content that is on its way: a picture and a few lines. The whole shape breathes, brighter then quieter. It does not travel at a constant speed.
                    </p>
                </div>
            </FoundationSection>
            <FoundationSection title="Reduced motion">
                <p className="max-w-2xl rounded-lg border border-line bg-surface p-spacing-05 text-sm text-muted">
                    Add motion-reduce:transition-none on a transition, or motion-reduce:animate-none on an animation. When the person asks for less motion, the change is instant. The button, the switch, and the loader already do this.
                </p>
            </FoundationSection>
        </FoundationPage>
    ),
};
