import type { Meta, StoryObj } from "@storybook/react-vite";
import { buttonSnippet, libraryExportNote } from "../../../.storybook/copyable-snippets";
import { DocBullets, DocCodeSection, DocPage, DocParagraph, DocRows, DocSection } from "./doc";

const meta = {
    title: "Getting started",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThisCatalog: Story = {
    name: "This catalog",
    render: () => (
        <DocPage title="This catalog" intro="The catalog is where a screen is tried. The app holds workspaces, clients, and projects.">
            <DocSection title="The groups">
                <DocParagraph>Open the group that matches the job. Patterns are workflows. Components and modules are the controls those workflows use.</DocParagraph>
                <DocRows
                    headers={["Open", "For"]}
                    rows={[
                        { label: "Foundations", detail: "Color, type, space, radius, shadow, and motion. Motion is primitives, then semantic roles. The component plays the role." },
                        { label: "Layout", detail: "Frames, content containers, overlays, rules, and arrangement." },
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
            <DocSection title="If you are building">
                <DocParagraph>Reusable controls come from the package. Product copy stays in the app. Commands, imports, and where a file goes are on This starter.</DocParagraph>
            </DocSection>
        </DocPage>
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
            <DocSection title="The Vite sibling">
                <DocParagraph>
                    rickvang/ui-starter is a separate repository with the same catalog idea and Vite for the app. Do not import across the two starters. Commands and routes in that repo belong to that README.
                </DocParagraph>
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={buttonSnippet} />
        </DocPage>
    ),
};
