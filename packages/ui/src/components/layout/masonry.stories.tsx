import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, masonrySnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { Masonry } from "./masonry";

const meta = {
    title: "Layout/Arrange/Split/Masonry",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoColumns: Story = {
    name: "Masonry",
    render: () => (
        <DocPage title="Masonry" intro="Uneven blocks pack into columns.">
            <DocSection title="Example">
                <DocParagraph>Use Masonry when blocks are uneven and should pack into columns.</DocParagraph>
                <DocDemo className="max-w-sm">
                    <Masonry>
                        <div className="mb-spacing-04 break-inside-avoid bg-canvas p-spacing-04 text-sm">Short</div>
                        <div className="mb-spacing-04 h-spacing-11 break-inside-avoid bg-canvas p-spacing-04 text-sm">Taller</div>
                        <div className="mb-spacing-04 h-spacing-09 break-inside-avoid bg-canvas p-spacing-04 text-sm">Middle</div>
                    </Masonry>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Blocks are uneven.", "They should pack into columns instead of lining up on one row."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["Equal columns of the same kind of block. Use Grid.", "Two resizable panes. Use Splitter."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={masonrySnippet} />
        </DocPage>
    ),
};
