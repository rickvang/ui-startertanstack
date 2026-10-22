import type { Meta, StoryObj } from "@storybook/react-vite";
import { DescriptionList } from "../base/description-list";
import { TextField } from "../base/text-field";
import { DocList, DocPage, DocSection } from "../templates/doc";

const meta = {
    title: "Patterns/Inline edit",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const InlineEdit: Story = {
    name: "Inline edit",
    render: () => (
        <DocPage title="Inline edit" intro="A later way to modify a record. One fact becomes a field where it sits. The detail does not gain a Save action.">
            <DocSection title="When to use">
                <DocList
                    items={[
                        { title: "One fact", body: "The person is changing a single value, not the whole record." },
                        { title: "In place", body: "The field replaces that fact. The rest of the detail stays as it was." },
                        { title: "No page save", body: "The change commits from the field. Save and Cancel stay on the form when the whole record is open." },
                    ]}
                />
            </DocSection>
            <DocSection title="Role">
                <div className="flex max-w-xl flex-col gap-spacing-05">
                    <DescriptionList items={[{ label: "Role", value: "Owner" }]} layout="horizontal" align="start" />
                    <TextField label="Role" layout="horizontal" defaultValue="Owner" />
                </div>
            </DocSection>
        </DocPage>
    ),
};
