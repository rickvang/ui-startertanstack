import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocPage, DocParagraph, DocRows, DocSection } from "./doc";

const meta = {
    title: "Patterns/Overview",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
    render: () => (
        <DocPage title="Overview" intro="A pattern is a workflow. Copy the closest story. Keep Shell as the frame: navigation, settings, help, and the account stay.">
            <DocSection title="How to choose a workflow">
                <DocParagraph>Pick the job, then open that story. Patterns are compositions, not exports from the package.</DocParagraph>
                <DocRows
                    headers={["Job", "Use"]}
                    rows={[
                        { label: "Another part of the product", detail: "Navigating domains. The shell stays, and the page inside changes." },
                        { label: "Another organization", detail: "Switching organizations. Pick it in the product slot. The domain menu stays." },
                        { label: "The product's settings", detail: "Product settings. Name, who can invite, and removing the product. The domain menu stays." },
                        { label: "The person's account", detail: "Account information. Profile, password, notices, and removing the account." },
                        { label: "Make one object", detail: "Create a record. Use a wizard when a later answer depends on an earlier one." },
                        { label: "Change one object", detail: "Modifying a record. Inline edit is for one fact where it sits." },
                        { label: "First run", detail: "Onboarding. Name the workspace and offer one invite." },
                        { label: "A queue", detail: "Task management. Status first, then the record or why it cannot continue." },
                        { label: "A set of numbers", detail: "Visualization page. Summary first. It stays its own page until there is a chart module." },
                        { label: "A path and the work it implies", detail: "Planning. A journey names friction. A story map slices the first release." },
                    ]}
                />
            </DocSection>
        </DocPage>
    ),
};
