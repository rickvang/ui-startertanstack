import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, wizardSnippet } from "../../../.storybook/story-snippets";
import { Button } from "../base/button";
import { Select } from "../base/select";
import { TextField } from "../base/text-field";
import { Steps } from "../navigation/steps";
import { DocDemo, DocCodeSection, DocPage, DocSection } from "../templates/doc";

const steps = ["Name", "Access", "Review"] as const;

type StepIndex = 0 | 1 | 2;

function stepBody(step: StepIndex) {
    switch (step) {
        case 0:
            return <TextField label="Project name" defaultValue="Studio" hint="Later access depends on this name." />;
        case 1:
            return <Select label="Who can open it" defaultValue="owners" options={[{ value: "owners", label: "Owners" }, { value: "members", label: "Members" }]} />;
        case 2:
            return <p className="text-sm text-ink">Studio is visible to owners. Save it from the review, or go back to change access.</p>;
        default: {
            const exhaustive: never = step;
            return exhaustive;
        }
    }
}

const meta = {
    title: "Patterns/Wizard",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Wizard: Story = {
    render: () => {
        const [step, setStep] = useState<StepIndex>(0);

        return (
            <DocPage title="Wizard" intro="A wizard is a create-record flow where a later answer depends on an earlier one. Each step stays short.">
            <DocCodeSection note={compositionNote} code={wizardSnippet} />
                <DocSection title="Project access">
                    <DocDemo className="max-w-md">
                    <div className="flex flex-col gap-spacing-05">
                        <Steps items={steps} current={step} />
                        {stepBody(step)}
                        <div className="flex gap-spacing-03">
                            <Button variant="secondary" disabled={step === 0} onClick={() => setStep((current) => (current === 0 ? 0 : ((current - 1) as StepIndex)))}>
                                Back
                            </Button>
                            <Button disabled={step === 2} onClick={() => setStep((current) => (current === 2 ? 2 : ((current + 1) as StepIndex)))}>
                                Next
                            </Button>
                        </div>
                    </div>
                    </DocDemo>
                </DocSection>
            </DocPage>
        );
    },
};
