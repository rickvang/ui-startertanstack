import type { Meta, StoryObj } from "@storybook/react-vite";
import { DescriptionList } from "./description-list";
import { DetailGroup } from "./detail-group";

const meta = {
    title: "Modules/Detail/Detail group",
    component: DetailGroup,
    args: {
        title: "Profile",
        children: null,
    },
} satisfies Meta<typeof DetailGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const facts = [
    { label: "Role", value: "Owner" },
    { label: "Lives in", value: "Hangzhou" },
];

export const Group: Story = {
    name: "Group",
    render: () => (
        <div className="w-full max-w-xl">
            <DetailGroup title="Profile">
                <DescriptionList items={facts} layout="horizontal" align="start" />
            </DetailGroup>
            <DetailGroup title="Activity" divider>
                <p className="text-sm text-muted">Nothing has happened yet.</p>
            </DetailGroup>
        </div>
    ),
};
