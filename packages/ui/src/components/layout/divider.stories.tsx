import type { Meta, StoryObj } from "@storybook/react-vite";
import { dividerSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { Divider } from "./divider";

const meta = {
    title: "Layout/Arrange/Divider",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Divider",
    render: () => (
        <DocPage title="Divider" intro="A line between items. The parent still owns the gap.">
            <DocSection title="Example">
                <DocParagraph>Use a Divider to draw a line between items.</DocParagraph>
                <DocDemo className="max-w-sm">
                    <div className="flex flex-col gap-spacing-04 text-sm">
                        <span>Members</span>
                        <Divider />
                        <span>Settings</span>
                    </div>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Items need a line between them.", "The parent still owns the gap."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["The gap already separates the items. Do not add a line for its own sake.", "A layout split. Use Grid, Splitter, or Masonry."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={dividerSnippet} />
        </DocPage>
    ),
};
