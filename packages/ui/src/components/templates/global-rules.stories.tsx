import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { cx } from "../../utils/cx";
import { DocDemo, DocList, DocPage, DocSection } from "./doc";

function Bone({ className }: { className: string }) {
    return <span className={cx("block rounded-sm bg-line", className)} />;
}

function BarRow({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cx("flex items-center gap-spacing-03", className)}>{children}</div>;
}

const meta = {
    title: "Layout/Rules",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const MessageAndFeedback: Story = {
    name: "Message and feedback",
    render: () => (
        <DocPage title="Message and feedback" intro="Feedback sits next to the thing that caused it. The page stays usable.">
            <DocSection title="Rules">
                <DocList
                    items={[
                        { title: "Next to the cause", body: "A field error sits with the field. A row status is a badge. A note that is not an action uses the tinted fill, not the accent button." },
                        { title: "Pick the pattern", body: "A finished action uses the result page. A page that cannot continue uses the exception page." },
                        { title: "Do not cover the work", body: "A message that can live in the page does not need to cover the page." },
                    ]}
                />
                <DocDemo className="max-w-md">
                <div className="flex flex-col gap-spacing-04">
                    <div className="flex flex-col gap-spacing-02">
                        <Bone className="h-spacing-03 w-spacing-09" />
                        <Bone className="h-spacing-08 w-full rounded-md border border-danger" />
                        <Bone className="h-spacing-03 w-3/5 bg-danger" />
                    </div>
                    <BarRow className="rounded-sm px-spacing-03 py-spacing-02">
                        <Bone className="h-spacing-04 w-spacing-10" />
                        <Bone className="ml-auto h-spacing-04 w-spacing-07 bg-warning-subtle" />
                    </BarRow>
                    <div className="flex flex-col gap-spacing-02 rounded-md bg-accent-subtle p-spacing-04">
                        <Bone className="h-spacing-04 w-spacing-10" />
                        <Bone className="h-spacing-03 w-full" />
                    </div>
                </div>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};

export const EmptyStatus: Story = {
    name: "Empty status",
    render: () => (
        <DocPage title="Empty status" intro="An empty area is a real state. It says what is missing and offers the action that adds the first item.">
            <DocSection title="Rules">
                <DocList
                    items={[
                        { title: "Same action as the full page", body: "If the full list invites a member, the empty list invites a member. Do not invent a second path." },
                        { title: "Explain the blank", body: "Do not show an empty table with no sentence. Say that nothing is here yet." },
                        { title: "Not an exception", body: "Empty means the page loaded and there is no data. Exception means the page cannot do the task." },
                    ]}
                />
                <DocDemo className="max-w-sm">
                    <div className="flex flex-col items-start gap-spacing-04">
                        <Bone className="h-spacing-05 w-spacing-11" />
                        <Bone className="h-spacing-03 w-full" />
                        <Bone className="h-spacing-03 w-4/5" />
                        <Bone className="h-spacing-07 w-spacing-09 rounded-md bg-neutral-500" />
                    </div>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
