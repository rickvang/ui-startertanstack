/** Copy-paste examples for Storybook Docs (PRTF-12). Keep aligned with rendered stories. */

export const catalogSetupSnippet = `import "@ui-starter/ui/theme.css";

// In apps/web, theme.css is imported once at the app entry.`;

export const buttonSnippet = `${catalogSetupSnippet}
import { Button } from "@ui-starter/ui";

export function SaveActions() {
    return (
        <>
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Cancel</Button>
        </>
    );
}`;

export const projectFormSnippet = `${catalogSetupSnippet}
import { Button, Fieldset, Form, FormSubmit, TextField } from "@ui-starter/ui";

export function ProjectForm() {
    return (
        <Form label="Project" onSubmit={() => undefined}>
            <Fieldset title="Project" className="w-full max-w-md">
                <TextField label="Project name" defaultValue="Studio" required />
                <div className="flex gap-spacing-03">
                    <FormSubmit>Save</FormSubmit>
                    <Button variant="secondary" type="button">Cancel</Button>
                </div>
            </Fieldset>
        </Form>
    );
}`;

export const membersTableSnippet = `${catalogSetupSnippet}
import { Table, type TableColumn, type TableItem } from "@ui-starter/ui";

const columns: TableColumn[] = [
    { id: "name", header: "Name", kind: "name" },
    { id: "role", header: "Role", kind: "text" },
    { id: "status", header: "Status", kind: "status" },
];

const members: TableItem[] = [
    { id: "alex", name: "Alex Kim", status: "Active", statusVariant: "success", values: { role: "Owner" } },
    { id: "jordan", name: "Jordan Lee", status: "Review", statusVariant: "warning", values: { role: "Member" } },
];

export function MembersTable() {
    return <Table label="Members" items={members} columns={columns} defaultValue="alex" />;
}`;

export const drawerCompositionSnippet = `${catalogSetupSnippet}
// Story composition — not exported from @ui-starter/ui.
// Pair a list with a full-height edge panel; the page behind stays visible.

export function ListWithDrawer() {
    return (
        <div className="flex h-80 max-w-xl overflow-hidden rounded-md border border-line bg-canvas">
            <div className="min-w-0 flex-1 p-spacing-04">{/* list */}</div>
            <aside className="flex h-full w-spacing-13 shrink-0 flex-col gap-spacing-04 border-l border-line bg-surface p-spacing-04 shadow-xl">
                {/* drawer task */}
            </aside>
        </div>
    );
}`;

export const createRecordSnippet = `${catalogSetupSnippet}
import { useState } from "react";
import { Badge, Button, FormGroup, TextField } from "@ui-starter/ui";

// Pattern composition — adapt fields and copy for your record type.
export function CreateRecordFlow() {
    const [saved, setSaved] = useState(false);

    if (saved) {
        return (
            <div className="flex max-w-sm flex-col items-start gap-spacing-04">
                <Badge variant="success">Saved</Badge>
                <p className="text-sm text-ink">The project name is stored.</p>
                <Button onClick={() => setSaved(false)}>Back to the form</Button>
            </div>
        );
    }

    return (
        <FormGroup title="Project">
            <TextField label="Project name" defaultValue="Studio" hint="Shown on the project home." />
            <TextField label="Description" defaultValue="The design system for North." />
            <div className="flex gap-spacing-03">
                <Button onClick={() => setSaved(true)}>Save</Button>
                <Button variant="secondary">Cancel</Button>
            </div>
        </FormGroup>
    );
}`;

export const libraryExportNote = "**Library export** — import from `@ui-starter/ui`.";

export const compositionNote = "**Story composition** — pattern or layout code to adapt; not a public package export.";

export function copyableDocs(source: string, storyNote: string) {
    return {
        description: { story: storyNote },
        source: { type: "code" as const, language: "tsx", code: source },
    };
}

export function librarySnippet(imports: string, jsxBody: string, exportName = "Example"): string {
    const bodyIndented = jsxBody
        .split("\n")
        .map((line) => (line.length > 0 ? `    ${line}` : line))
        .join("\n");

    return `${catalogSetupSnippet}
import { ${imports} } from "@ui-starter/ui";

export function ${exportName}() {
  return (
${bodyIndented}
  );
}`;
}

export const autodocsTags = ["autodocs"] as const;

export const autodocsComponentParameters = {
    docs: {
        description: {
            component: `${libraryExportNote} Import \`theme.css\` once in the app or Storybook preview.`,
        },
    },
};

export function storyDocs(imports: string, jsxBody: string, exportName = "Example") {
    return {
        parameters: {
            docs: copyableDocs(librarySnippet(imports, jsxBody, exportName), libraryExportNote),
        },
    };
}

export function patternSnippet(imports: string, jsxBody: string, exportName: string): string {
    const bodyIndented = jsxBody
        .split("\n")
        .map((line) => (line.length > 0 ? `    ${line}` : line))
        .join("\n");

    return `${catalogSetupSnippet}
import { ${imports} } from "@ui-starter/ui";

// Pattern composition — adapt fields, copy, and data wiring for your product.
export function ${exportName}() {
  return (
${bodyIndented}
  );
}`;
}

export function moduleSnippet(imports: string, jsxBody: string, exportName: string): string {
    const bodyIndented = jsxBody
        .split("\n")
        .map((line) => (line.length > 0 ? `    ${line}` : line))
        .join("\n");

    return `${catalogSetupSnippet}
import { ${imports} } from "@ui-starter/ui";

export function ${exportName}() {
  return (
${bodyIndented}
  );
}`;
}
