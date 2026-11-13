import type { Meta, StoryObj } from "@storybook/react-vite";
import { buttonSnippet, libraryExportNote } from "../../../.storybook/copyable-snippets";
import { DocBullets, DocCodeSection, DocLibraryHome, DocPage, DocParagraph, DocRows, DocSection } from "./doc";
import { gettingStartedAgentGuidance } from "../base/inputs.agent";

const meta = {
    title: "Getting started",
    parameters: {
        layout: "fullscreen",
        agent: gettingStartedAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThisCatalog: Story = {
    name: "This catalog",
    render: () => (
        <DocLibraryHome
            eyebrow="UI Starter design system"
            title="A catalog for building product UI"
            lede="Try screens here. Ship them in the app. Foundations, components, modules, and patterns — one library."
            primary={{ label: "Browse foundations", href: "?path=/story/foundations-color--primitives" }}
            secondary={{ label: "Open components", href: "?path=/story/components-button--button-story" }}
            sections={[
                {
                    title: "Foundations",
                    body: "Color, type, space, motion — the tokens everything else uses.",
                },
                {
                    title: "Components",
                    body: "Buttons, fields, overlays, and the rest of the control set.",
                },
                {
                    title: "Patterns",
                    body: "Workflows composed from modules: settings, tables, tasks.",
                },
            ]}
        />
    ),
};

export const ThisStarter: Story = {
    name: "This starter",
    render: () => (
        <DocPage title="This starter" intro="This repository is the TanStack Start starter. packages/ui is the catalog. apps/web is the demo.">
            <DocSection title="Commands">
                <DocParagraph>Install once. Storybook is the catalog. The app is the demo. Details stay in the README.</DocParagraph>
                <DocRows
                    headers={["Command", "Opens"]}
                    rows={[
                        { label: "bun install", detail: "Installs the workspace." },
                        { label: "bun run storybook", detail: "http://localhost:6006" },
                        { label: "bun run dev", detail: "http://localhost:3000" },
                        { label: "bun run typecheck", detail: "Typecheck for packages/ui and apps/web." },
                    ]}
                />
            </DocSection>
            <DocSection title="Where a change goes">
                <DocRows
                    headers={["Job", "Change"]}
                    rows={[
                        { label: "A control that does not exist", detail: "Add it in packages/ui/src/components, export it from packages/ui/src/index.ts, and put a story beside the file." },
                        { label: "Color, type, space, or motion", detail: "Semantic tokens in packages/ui/src/styles/theme.css. Primitive ramps stay fixed. A component owns its motion." },
                        { label: "A page", detail: "apps/web/src/routes with createFileRoute. Keep Shell as the frame. The document shell stays __root.tsx." },
                        { label: "A workspace, client, or project", detail: "One entry in apps/web/src/areas.ts. Add its page only when asked." },
                    ]}
                />
            </DocSection>
            <DocSection title="The groups">
                <DocParagraph>Open the group that matches the job. Patterns are workflows. Components and modules are the controls those workflows use.</DocParagraph>
                <DocRows
                    headers={["Open", "For"]}
                    rows={[
                        { label: "Foundations", detail: "Color, type, space, radius, shadow, and motion." },
                        { label: "Layout", detail: "Frames, content containers, overlays, and arrangement." },
                        { label: "Components", detail: "One control. Navigation sits here." },
                        { label: "Modules", detail: "Shell, settings, account, forms, detail, and table." },
                        { label: "Patterns", detail: "A workflow. Copy the closest story. Keep Shell as the frame." },
                    ]}
                />
            </DocSection>
            <DocSection title="In this space">
                <DocBullets
                    items={[
                        "Mock a screen as a story. Put it in the app only when asked.",
                        "The toolbar switches light and dark. Review at desktop (1440px) and mobile (375px).",
                        "Pick a workflow from Patterns/Overview. Do not import a pattern as a component.",
                    ]}
                />
            </DocSection>
            <DocSection title="The Vite sibling">
                <DocParagraph>
                    rickvang/ui-starter is a separate repository with the same catalog idea and Vite for the app. Do not import across the two starters. Commands and routes in that repo belong to that README.
                </DocParagraph>
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={buttonSnippet} />
        </DocPage>
    ),
};
