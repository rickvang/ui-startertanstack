import type { Meta, StoryObj } from "@storybook/react-vite";
import { flexSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { Flex } from "./flex";

const meta = {
    title: "Layout/Arrange/Flow/Flex",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Row: Story = {
    name: "Flex",
    render: () => (
        <DocPage title="Flex" intro="Items stay on one line. A row is a toolbar. A column is a short list that should not wrap.">
            <DocSection title="Example">
                <DocParagraph>Use Flex when items stay on one line.</DocParagraph>
                <DocDemo>
                    <Flex>
                        <span className="text-sm">One</span>
                        <span className="text-sm">Two</span>
                        <span className="text-sm">Three</span>
                    </Flex>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Items stay on one line.", "A row is a toolbar. A column is a short list that should not wrap."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["Inline items should wrap. Use Space.", "Blocks stack vertically. Use Stack."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={flexSnippet} />
        </DocPage>
    ),
};
