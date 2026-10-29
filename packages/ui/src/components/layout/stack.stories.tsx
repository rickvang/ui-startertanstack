import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, stackSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { Stack } from "./stack";

const meta = {
    title: "Layout/Arrange/Flow/Stack",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
    name: "Stack",
    render: () => (
        <DocPage title="Stack" intro="A parent places blocks vertically. The children do not add their own margin.">
            <DocSection title="Example">
                <DocParagraph>Use Stack when a parent places blocks vertically.</DocParagraph>
                <DocDemo>
                    <Stack gap="lg">
                        <Stack gap="sm" className="rounded-md border border-line bg-surface p-spacing-04 text-sm text-ink">
                            <span>Small gap</span>
                            <span>These two lines stay together.</span>
                        </Stack>
                        <span className="text-sm text-muted">A larger gap separates that group from the next block.</span>
                    </Stack>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Blocks sit one under another.", "The parent owns the gap. The children do not add their own margin."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["Items stay on one line. Use Flex.", "Inline items should wrap. Use Space."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={stackSnippet} />
        </DocPage>
    ),
};
