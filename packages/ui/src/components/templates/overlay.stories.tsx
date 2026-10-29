import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, modalCompositionSnippet } from "../../../.storybook/story-snippets";
import { cx } from "../../utils/cx";
import { DocBullets, DocCodeSection, DocPage, DocParagraph, DocSection } from "./doc";

function Bone({ className }: { className: string }) {
    return <span className={cx("block rounded-sm bg-line", className)} />;
}

function BarRow({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cx("flex items-center gap-spacing-03", className)}>{children}</div>;
}

function Field() {
    return (
        <div className="flex flex-col gap-spacing-02">
            <Bone className="h-spacing-03 w-spacing-09" />
            <Bone className="h-spacing-08 w-full rounded-md" />
        </div>
    );
}

function Actions() {
    return (
        <BarRow className="justify-end">
            <Bone className="h-spacing-07 w-spacing-09 rounded-md" />
            <Bone className="h-spacing-07 w-spacing-09 rounded-md bg-neutral-500" />
        </BarRow>
    );
}

function ListRows() {
    return (
        <div className="flex min-w-0 flex-1 flex-col gap-spacing-02 p-spacing-04">
            <Bone className="mb-spacing-02 h-spacing-04 w-spacing-10" />
            <div className="flex items-center gap-spacing-03 rounded-sm bg-selected px-spacing-03 py-spacing-02">
                <Bone className="h-spacing-04 w-spacing-10" />
                <Bone className="ml-auto h-spacing-04 w-spacing-07" />
            </div>
            <BarRow className="px-spacing-03 py-spacing-02">
                <Bone className="h-spacing-04 w-spacing-09" />
                <Bone className="ml-auto h-spacing-04 w-spacing-07" />
            </BarRow>
            <BarRow className="px-spacing-03 py-spacing-02">
                <Bone className="h-spacing-04 w-spacing-10" />
                <Bone className="ml-auto h-spacing-04 w-spacing-07" />
            </BarRow>
        </div>
    );
}

function Stage({ children }: { children: ReactNode }) {
    return <div className="relative h-80 max-w-xl overflow-hidden rounded-md border border-line bg-canvas">{children}</div>;
}

function Scrim() {
    return <div className="absolute inset-0 bg-overlay" />;
}

function Dialog({ children }: { children: ReactNode }) {
    return <div className="absolute top-1/2 left-1/2 flex w-full max-w-xs -translate-x-1/2 -translate-y-1/2 flex-col gap-spacing-04 rounded-md bg-surface p-spacing-05 shadow-xl">{children}</div>;
}

const meta = {
    title: "Layout/Overlays",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Modal: Story = {
    name: "Modal",
    render: () => (
        <DocPage title="Modal" intro="A modal stops the page. Use it for a short decision the person must answer before they continue.">
            <DocSection title="Example">
                <DocParagraph>Name the object and the consequence. Cancel is the safe choice. The confirming action uses a direct verb.</DocParagraph>
                <Stage>
                    <ListRows />
                    <Scrim />
                    <Dialog>
                        <Bone className="h-spacing-05 w-spacing-11" />
                        <Bone className="h-spacing-03 w-full" />
                        <Bone className="h-spacing-03 w-4/5" />
                        <Actions />
                    </Dialog>
                </Stage>
                <DocParagraph>Rename, or another change that can be finished without looking at the rest of the page.</DocParagraph>
                <Stage>
                    <ListRows />
                    <Scrim />
                    <Dialog>
                        <Bone className="h-spacing-05 w-spacing-10" />
                        <Field />
                        <Actions />
                    </Dialog>
                </Stage>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A short decision the person must answer before they continue.", "A confirm, or a form with one or two fields."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "The person needs the page behind the dialog to answer. Use a drawer or stay on the page.",
                        "A nested overlay. Do not open a modal from a modal, a drawer, or a slide-in.",
                        "A multi-section form, a list, or member management. That belongs on a pattern.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={compositionNote} code={modalCompositionSnippet} />
        </DocPage>
    ),
};
