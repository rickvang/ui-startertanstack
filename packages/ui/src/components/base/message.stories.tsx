import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, messageSnippet } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
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
        <DocPage title="Message" intro="Feedback sits next to the thing that caused it. The page stays usable.">
            <DocSection title="Example">
                <DocDemo className="max-w-md">
                    <div className="flex flex-col gap-spacing-04">
                        <Message title="Product saved">The name and description are kept.</Message>
                        <Message tone="success" title="Password saved">
                            The new password is set.
                        </Message>
                        <Message tone="danger" title="Product removed">
                            North was removed.
                        </Message>
                    </div>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets
                    items={[
                        "A note about something that just happened, next to that work.",
                        "Settings, account, and other modules use Message for a saved or removed result.",
                    ]}
                />
            </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "An empty container. Use Empty state inside the panel.",
                            "A field that failed. Use Field. The error sits with the field.",
                            "A row status. Use Badge.",
                            "A table that failed to load. Use Table error. The header stays.",
                            "A note about the whole page. Use Banner.",
                            "A brief notice after leaving the work. Use Toast.",
                        ]}
                    />
                </DocSection>
                <DocSection title="Rules">
                    <DocBullets
                        items={[
                            "A message that can live in the page does not cover the page.",
                            "A finished action uses the result next to the work. After leaving that work, use Toast.",
                            "A page that cannot continue uses the exception, not a toast over the work.",
                            "A note that is not an action uses the tinted fill, not the accent button.",
                        ]}
                    />
                </DocSection>
            <DocCodeSection note={libraryExportNote} code={messageSnippet} />
        </DocPage>
    ),
};
