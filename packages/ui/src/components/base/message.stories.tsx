import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, messageSnippet } from "../../../.storybook/story-snippets";
import { DocCodeSection } from "../templates/doc";
import { Message } from "./message";

const meta = {
    title: "Components/Message",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const MessageStory: Story = {
    name: "Message",
    render: () => (
        <div className="flex max-w-md flex-col gap-spacing-04 p-spacing-05">
            <DocCodeSection note={libraryExportNote} code={messageSnippet} />
            <Message title="Product saved">The name and description are kept.</Message>
            <Message tone="success" title="Password saved">The new password is set.</Message>
            <Message tone="danger" title="Product removed">North was removed.</Message>
        </div>
    ),
};
