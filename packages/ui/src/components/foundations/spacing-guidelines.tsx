import type { ReactNode } from "react";
import { Button } from "../base/button";
import { Stack } from "../layout/stack";
import { TextField } from "../base/text-field";
import { FormGroup } from "../modules/form-group";
import { FoundationSection } from "./catalog";

const rules = [
    {
        title: "Use a spacing step",
        body: "Margin, padding, gap, width, and height come from the spacing scale. Product UI does not use raw pixel lengths or the default numeric utilities such as p-4, gap-2, or h-10.",
    },
    {
        title: "One scale for space and size",
        body: "A step means the same length either way. spacing-07 is 32px as a gap between sections and as the height of a small control.",
    },
    {
        title: "Parents space their children",
        body: "A control pads what is inside it. It does not add margin to separate itself from a sibling. Stack, a form, or the page owns that gap.",
    },
    {
        title: "Distance shows the relationship",
        body: "Items that belong together use a smaller step. A new group uses a larger step. Give the most important region the most space around it.",
    },
    {
        title: "Steps stay the same at every viewport",
        body: "A token does not change size when the screen changes. On a smaller viewport, choose a smaller step. Page padding can be spacing-06 on desktop and spacing-04 on mobile.",
    },
    {
        title: "Percentages divide a region",
        body: "Use a half or a third to split an area. Use a spacing step for the gap inside that split.",
    },
] as const;

const steps = [
    ["spacing-01", "2px", "Focus ring offset"],
    ["spacing-02", "4px", "Label to field, hint under a field"],
    ["spacing-03", "8px", "Icon to label, field padding, buttons in a row"],
    ["spacing-04", "12px", "Horizontal padding of a control, gap between fields"],
    ["spacing-05", "16px", "Padding of a medium control"],
    ["spacing-05.5", "20px", "Padding of a roomy panel"],
    ["spacing-06", "24px", "Dense control height, page horizontal padding"],
    ["spacing-07", "32px", "Control and field height"],
    ["spacing-08", "40px", "List row and medium control height"],
    ["spacing-09", "48px", "Large control height"],
    ["spacing-10", "64px", "Space above and below a page region"],
    ["spacing-11", "80px", "Large empty band"],
    ["spacing-12", "96px", "Larger empty band"],
    ["spacing-13", "160px", "Widest layout step"],
] as const;

function RuleList() {
    return (
        <ol className="flex flex-col gap-spacing-06">
            {rules.map((rule, index) => (
                <li key={rule.title} className="grid grid-cols-[2rem_1fr] gap-spacing-03">
                    <span className="font-mono text-xs text-muted">{index + 1}</span>
                    <div className="flex flex-col gap-spacing-02">
                        <h3 className="text-sm font-medium">{rule.title}</h3>
                        <p className="max-w-2xl text-sm text-muted">{rule.body}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
}

function StepGuide() {
    return (
        <div className="overflow-hidden rounded-lg border border-line bg-surface">
            {steps.map(([token, size, use]) => (
                <div key={token} className="grid grid-cols-[8rem_4rem_1fr] items-baseline gap-spacing-04 border-b border-line px-spacing-05 py-spacing-04 last:border-b-0">
                    <span className="font-mono text-xs">{token}</span>
                    <span className="font-mono text-xs text-muted">{size}</span>
                    <span className="text-sm text-muted">{use}</span>
                </div>
            ))}
        </div>
    );
}

function Example({ title, children }: { title: string; children: ReactNode }) {
    return (
        <FoundationSection title={title}>
            <div className="rounded-lg border border-line bg-surface p-spacing-05">{children}</div>
        </FoundationSection>
    );
}

export function SpacingUsage() {
    return (
        <>
            <FoundationSection title="Usage">
                <RuleList />
            </FoundationSection>
            <FoundationSection title="Which step">
                <StepGuide />
            </FoundationSection>
        </>
    );
}

export function SpacingExamples() {
    return (
        <>
            <Example title="Stack">
                <p className="mb-spacing-05 max-w-2xl text-sm text-muted">
                    Stack places siblings. Small is spacing-03, medium is spacing-05, and large is spacing-07. Children do not set their own margin.
                </p>
                <Stack gap="md">
                    <Stack gap="sm" className="rounded-md border border-line bg-surface p-spacing-04 text-sm">
                        <span>Small keeps one group together.</span>
                        <span>These two lines are spacing-03 apart.</span>
                    </Stack>
                    <p className="text-sm text-muted">Medium separates that group from the next block.</p>
                </Stack>
            </Example>
            <Example title="Inline actions">
                <p className="mb-spacing-05 max-w-2xl text-sm text-muted">Buttons in a row use spacing-03. A medium button is spacing-08 tall. A small button is spacing-07 tall.</p>
                <div className="flex flex-wrap gap-spacing-03">
                    <Button>Save</Button>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="ghost">
                        Theme
                    </Button>
                </div>
            </Example>
            <Example title="Field">
                <p className="mb-spacing-05 max-w-2xl text-sm text-muted">
                    The label, the control, and the hint are spacing-03 apart. The control is spacing-08 tall and uses spacing-04 of horizontal padding.
                </p>
                <div className="max-w-sm">
                    <TextField label="Project name" hint="Stored only in this page for now." defaultValue="ui-starter" />
                </div>
            </Example>
            <Example title="Forms">
                <p className="mb-spacing-05 max-w-2xl text-sm text-muted">
                    A panel uses spacing-05.5 of padding. The title, fields, and actions inside it use a medium stack, which is spacing-05.
                </p>
                <FormGroup title="Project">
                    <TextField label="Project name" defaultValue="ui-starter" />
                    <div className="flex flex-wrap gap-spacing-03">
                        <Button>Save</Button>
                        <Button variant="secondary">Cancel</Button>
                    </div>
                </FormGroup>
            </Example>
            <Example title="Page">
                <p className="max-w-2xl text-sm text-muted">
                    A page uses spacing-06 on the left and right, spacing-10 above and below, and spacing-07 between regions such as the header and the form.
                </p>
            </Example>
        </>
    );
}
