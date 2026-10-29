import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, drawerSnippet, libraryExportNote, modalCompositionSnippet, slideInCompositionSnippet } from "../../../.storybook/story-snippets";
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

function DrawerPanel({ children }: { children: ReactNode }) {
    return <aside className="flex h-full w-spacing-13 shrink-0 flex-col gap-spacing-04 border-l border-line bg-surface p-spacing-04 shadow-xl">{children}</aside>;
}

function SlidePanel({ children }: { children: ReactNode }) {
    return <div className="absolute top-spacing-06 right-spacing-04 flex w-spacing-13 flex-col gap-spacing-04 rounded-md border border-line bg-surface p-spacing-04 shadow-lg">{children}</div>;
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

export const DrawerWhen: Story = {
    name: "Drawer, when",
    render: () => (
        <DocPage title="Drawer, when" intro="A drawer is a full-height panel from the edge. The page stays visible, so the person keeps their place. The moving panel is the Drawer component.">
            <DocSection title="Example">
                <DocParagraph>Open one entry beside the list. Closing the drawer returns to the same scroll position.</DocParagraph>
                <Stage>
                    <div className="flex h-full">
                        <ListRows />
                        <DrawerPanel>
                            <BarRow>
                                <Bone className="h-spacing-05 w-spacing-10" />
                                <Bone className="h-spacing-04 w-spacing-07" />
                            </BarRow>
                            <Bone className="h-px w-full" />
                            <div className="flex flex-col gap-spacing-02">
                                <Bone className="h-spacing-03 w-spacing-07" />
                                <Bone className="h-spacing-04 w-spacing-10" />
                            </div>
                            <div className="flex flex-col gap-spacing-02">
                                <Bone className="h-spacing-03 w-spacing-08" />
                                <Bone className="h-spacing-04 w-spacing-09" />
                            </div>
                            <Bone className="mt-auto h-spacing-07 w-spacing-10 rounded-md" />
                        </DrawerPanel>
                    </div>
                </Stage>
                <DocParagraph>A few filters sit above the list. A long set opens in a drawer so the list can still be seen.</DocParagraph>
                <Stage>
                    <div className="flex h-full">
                        <ListRows />
                        <DrawerPanel>
                            <Bone className="h-spacing-04 w-spacing-08" />
                            <Field />
                            <Field />
                            <Field />
                            <Actions />
                        </DrawerPanel>
                    </div>
                </Stage>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["The person keeps the page, and the task needs the full height.", "The list or record behind the drawer stays put."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["The product menu. That is the layout side, and it stays put.", "A confirm or a one-field edit. Use a modal."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={drawerSnippet} />
        </DocPage>
    ),
};

export const SlideIn: Story = {
    name: "Slide-in",
    render: () => (
        <DocPage title="Slide-in" intro="A slide-in is a small panel from the edge. It does not take the full height. Use it for a quick task on the current page.">
            <DocSection title="Example">
                <DocParagraph>The list stays in place. The panel is only as tall as the form. Dismissing it does not change the page.</DocParagraph>
                <Stage>
                    <ListRows />
                    <SlidePanel>
                        <Bone className="h-spacing-04 w-spacing-08" />
                        <Field />
                        <Actions />
                    </SlidePanel>
                </Stage>
                <DocParagraph>Comments or a short activity log can slide in over the item the person already has open. They should not cover the whole page.</DocParagraph>
                <Stage>
                    <div className="flex flex-col gap-spacing-04 p-spacing-05">
                        <Bone className="h-spacing-05 w-spacing-11" />
                        <Bone className="h-spacing-03 w-full" />
                        <Bone className="h-spacing-03 w-4/5" />
                        <Bone className="h-spacing-10 w-full" />
                    </div>
                    <SlidePanel>
                        <Bone className="h-spacing-04 w-spacing-07" />
                        <Bone className="h-spacing-03 w-full" />
                        <Bone className="h-spacing-03 w-4/5" />
                        <Bone className="h-spacing-03 w-full" />
                        <Bone className="h-spacing-03 w-3/5" />
                    </SlidePanel>
                </Stage>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A quick task on the current page.", "The panel should not take the full height."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "The task needs the full height, or the person will compare it with the list for a while. Use a drawer.",
                        "A nested overlay. Do not stack a modal on a slide-in.",
                        "A route change. A slide-in closes back to the page that opened it.",
                    ]}
                />
            </DocSection>
            <DocCodeSection note={compositionNote} code={slideInCompositionSnippet} />
        </DocPage>
    ),
};
