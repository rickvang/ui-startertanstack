import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, spaceSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { Space } from "./space";

const meta = {
    title: "Layout/Arrange/Flow/Space",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inline: Story = {
    name: "Space",
    render: () => (
        <DocPage title="Space" intro="Inline items wrap onto the next line, such as a row of actions.">
            <DocSection title="Example">
                <DocParagraph>Use Space when inline items should wrap onto the next line.</DocParagraph>
                <DocDemo className="max-w-xs">
                    <Space>
                        <span className="text-sm">Save</span>
                        <span className="text-sm">Cancel</span>
                        <span className="text-sm">Theme</span>
                    </Space>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets items={["Inline items should wrap onto the next line.", "A row of actions that may not fit."]} />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets items={["Items stay on one line. Use Flex.", "Blocks stack vertically. Use Stack."]} />
            </DocSection>
            <DocCodeSection note={libraryExportNote} code={spaceSnippet} />
        </DocPage>
    ),
};
