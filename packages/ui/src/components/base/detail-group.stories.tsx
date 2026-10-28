import type { Meta, StoryObj } from "@storybook/react-vite";
import { detailGroupSnippet, libraryExportNote } from "../../../.storybook/story-snippets";
import { DocDemo, DocList, DocCodeSection, DocPage, DocSection } from "../templates/doc";
import { DescriptionList } from "./description-list";
import { DetailGroup } from "./detail-group";

const meta = {
    title: "Modules/Detail",
    component: DetailGroup,
    parameters: { layout: "fullscreen" },
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

export const DetailGroupStory: Story = {
    name: "Detail group",
    render: () => (
        <DocPage title="Detail group" intro="A detail group is one set of facts inside a detail. The title is a noun, such as Profile or Activity.">
            <DocCodeSection note={libraryExportNote} code={detailGroupSnippet} />
            <DocSection title="Common practice">
                <DocList
                    items={[
                        { title: "One set of facts", body: "Role and location belong in Profile. A later subject, such as activity, gets its own group." },
                        { title: "The first group", body: "The first group has no line above it. A later group sets the divider." },
                        { title: "Nothing here yet", body: "An empty group says what is missing. It does not leave a blank area." },
                    ]}
                />
            </DocSection>
            <DocSection title="Member">
                <DocDemo className="max-w-xl">
                    <DetailGroup title="Profile">
                        <DescriptionList items={facts} layout="horizontal" align="start" />
                    </DetailGroup>
                    <DetailGroup title="Activity" divider>
                        <p className="text-sm text-muted">Nothing has happened yet.</p>
                    </DetailGroup>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
