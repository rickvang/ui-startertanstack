import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { bannerSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocSection } from "../templates/doc";
import { Banner } from "./banner";

const meta = {
    title: "Components/Banner",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BannerStory: Story = {
    name: "Banner",
    render: () => {
        const [visible, setVisible] = useState(true);

        return (
            <DocPage title="Banner" intro="A page-level note. It sits at the top of the work and stays until the condition ends, or until the person closes it.">
                <DocSection title="Example">
                    <DocDemo className="flex max-w-xl flex-col gap-spacing-04">
                        <Banner title="Scheduled maintenance">The catalog will pause on Saturday from 2 to 4.</Banner>
                        {visible ? (
                            <Banner tone="success" title="Invite sent" onDismiss={() => setVisible(false)}>
                                Alex Kim will see the invite in email.
                            </Banner>
                        ) : null}
                        <Banner tone="danger" title="Billing failed">Update the payment method to keep the product.</Banner>
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["A note about the whole page, not one field.", "The note should stay until the condition ends, or until the person closes it."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "A result next to the work that caused it. Use Message.",
                            "A brief notice after leaving that work. Use Toast.",
                            "A yes or no. Use Dialog.",
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={libraryExportNote} code={bannerSnippet} />
            </DocPage>
        );
    },
};
