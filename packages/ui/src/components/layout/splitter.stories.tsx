import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, splitterSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { Splitter } from "./splitter";

const meta = {
    title: "Layout/Arrange/Split/Splitter",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoPanes: Story = {
    name: "Splitter",
    render: () => (
        <DocPage title="Splitter" intro="A region is two panes, such as a list beside its details.">
            <DocSection title="Example">
                <DocParagraph>Use Splitter when a region is two panes.</DocParagraph>
                <DocDemo className="max-w-xl">
                    <Splitter start="Members" end="Details" />
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["A list beside its details.", "The person should be able to resize the two panes."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["Equal columns of the same kind of block. Use Grid.", "Uneven blocks that pack. Use Masonry."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={splitterSnippet} />
        </DocPage>
    ),
};
