import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../base/button";
import { TextField } from "../base/text-field";
import { Steps } from "../navigation/steps";
import { DocPage, DocSection } from "../templates/doc";

const steps = ["Workspace", "Invite", "Done"] as const;

type StepIndex = 0 | 1 | 2;

function stepBody(step: StepIndex) {
    switch (step) {
        case 0:
            return <TextField label="Workspace name" defaultValue="North" hint="People see this name when they join." />;
        case 1:
            return <TextField label="Email" placeholder="name@north.com" hint="You can skip this and invite someone later." />;
        case 2:
            return <p className="text-sm text-ink">North is ready. Open the workspace, or go back to send an invite.</p>;
        default: {
            const exhaustive: never = step;
            return exhaustive;
        }
    }
}

const meta = {
    title: "Patterns/Onboarding",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Onboarding: Story = {
    render: () => {
        const [step, setStep] = useState<StepIndex>(0);

        return (
            <DocPage title="Onboarding" intro="Onboarding is the first run. It names the workspace, offers one invite, and lands the person in the product.">
                <DocSection title="First run">
                    <div className="flex max-w-md flex-col gap-spacing-05">
                        <Steps items={steps} current={step} />
                        {stepBody(step)}
                        <div className="flex gap-spacing-03">
                            {step === 0 ? null : (
                                <Button variant="secondary" onClick={() => setStep((current) => (current === 0 ? 0 : ((current - 1) as StepIndex)))}>
                                    Back
                                </Button>
                            )}
                            {step === 2 ? (
                                <Button onClick={() => setStep(0)}>Start again</Button>
                            ) : (
                                <Button onClick={() => setStep((current) => (current === 2 ? 2 : ((current + 1) as StepIndex)))}>{step === 1 ? "Finish" : "Next"}</Button>
                            )}
                        </div>
                    </div>
                </DocSection>
            </DocPage>
        );
    },
};
