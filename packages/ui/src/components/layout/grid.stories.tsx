import type { Meta, StoryObj } from "@storybook/react-vite";
import { gridSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { Grid } from "./grid";

const meta = {
    title: "Layout/Arrange/Split/Grid",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
    name: "Grid",
    render: () => (
        <DocPage title="Grid" intro="A region splits into equal columns.">
            <DocSection title="Example">
                <DocParagraph>Use Grid when a region splits into equal columns.</DocParagraph>
                <DocDemo className="max-w-xl">
                    <Grid>
                        <div className="bg-canvas p-spacing-04 text-sm">One</div>
                        <div className="bg-canvas p-spacing-04 text-sm">Two</div>
                        <div className="bg-canvas p-spacing-04 text-sm">Three</div>
                    </Grid>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A region splits into equal columns.", "The cells are the same kind of block."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["Blocks are uneven and should pack. Use Masonry.", "A region is two resizable panes. Use Splitter."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={gridSnippet} />
        </DocPage>
    ),
};
