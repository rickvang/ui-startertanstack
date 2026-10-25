import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocList, DocPage, DocSection } from "./doc";

const meta = {
    title: "Patterns/Overview",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
    render: () => (
        <DocPage title="Overview" intro="A module is a group of components that behaves as one unit. A pattern is a workflow that uses those units to finish a job. The shell is the module that stays put. Navigating domains changes the page inside it.">
            <DocSection title="What to read">
                <DocList
                    items={[
                        {
                            title: "Modules",
                            body: "Shell, forms, detail, and table. Each one has its own interaction.",
                        },
                        {
                            title: "Workflows",
                            body: "Navigating domains, switching organizations, create a record, modifying a record, wizard, onboarding, and task management. Inline edit is a later way to change one fact. A workflow ends in a result, or explains why it cannot continue.",
                        },
                        {
                            title: "Navigating domains",
                            body: "Choosing a domain in the shell changes the page. Settings, help, and the account stay.",
                        },
                    ]}
                />
            </DocSection>
            <DocSection title="How to choose a workflow">
                <DocList
                    items={[
                        { title: "Another part of the product", body: "Use navigating domains. The shell stays, and the page inside changes." },
                        { title: "Another organization", body: "Use switching organizations. Pick it in the product slot. The domain menu stays, and the page shows that organization." },
                        { title: "One object", body: "Use create a record to make it. Use modifying a record to change it. Use a wizard when a later answer depends on an earlier one." },
                        { title: "First run", body: "Use onboarding to name the workspace and offer one invite." },
                        { title: "A queue", body: "Use task management to see status, open one item, and return." },
                        { title: "A set of numbers", body: "Use the visualization page. It stays its own page until there is a chart module." },
                    ]}
                />
            </DocSection>
        </DocPage>
    ),
};
