import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../base/avatar";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { DescriptionList } from "../base/description-list";
import { DetailGroup } from "../base/detail-group";
import { Anchor } from "../navigation/anchor";
import { Steps } from "../navigation/steps";
import { Tabs } from "../navigation/tabs";
import { DocBullets, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";
import { DetailCard as DetailCardModule } from "./detail-card";

const meta = {
    title: "Modules/Detail",
    component: DetailCardModule,
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DetailCardModule>;

export default meta;

type Story = StoryObj<typeof meta>;

const facts = [
    { label: "Role", value: "Owner" },
    { label: "Lives in", value: "Hangzhou" },
];

export const Detail: Story = {
    name: "Detail",
    args: { title: "Alex Kim", status: "Active", children: null },
    render: () => (
        <DocPage title="Detail" intro="A detail is one record: its name, its status, and the action that belongs to it.">
            <DocSection title="Example">
                <DocParagraph>Groups hold the facts. The first group has no line above it. A later group sets the divider.</DocParagraph>
                <DocDemo className="max-w-3xl">
                <DetailCardModule title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary">Edit</Button>}>
                    <DetailGroup title="Profile">
                        <DescriptionList items={facts} layout="horizontal" align="start" />
                    </DetailGroup>
                    <DetailGroup title="Access" divider>
                        <DescriptionList items={[{ label: "Team", value: "North" }, { label: "Visibility", value: "Team" }]} layout="horizontal" align="end" />
                    </DetailGroup>
                    <DetailGroup title="Activity" divider>
                        <p className="text-sm text-muted">Nothing has happened yet.</p>
                    </DetailGroup>
                </DetailCardModule>
                </DocDemo>
            </DocSection>
            <DocSection title="When to use">
                <DocBullets
                    items={[
                        "The person is reading one record, and the content is one level. Groups split the facts.",
                        "The parts are weakly related, such as profile, access, and activity. Use tabs.",
                        "The record has a process. Use steps, and put the decision with the record.",
                    ]}
                />
            </DocSection>
            <DocSection title="When not to use">
                <DocBullets
                    items={[
                        "Many records of the same kind. Use a table.",
                        "The person is changing the record. Use a form.",
                    ]}
                />
            </DocSection>
            <DocSection title="Label above the value">
                <DocParagraph>Use this when the fact is short and the label can sit on its own line.</DocParagraph>
                <DocDemo className="max-w-3xl">
                <DetailCardModule title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary">Edit</Button>}>
                    <DescriptionList items={facts} />
                </DetailCardModule>
                </DocDemo>
            </DocSection>
            <DocSection title="Label beside the value">
                <DocParagraph>The label and the value share a row. The value starts at the left.</DocParagraph>
                <DocDemo className="max-w-3xl">
                <DetailCardModule title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary">Edit</Button>}>
                    <DescriptionList items={facts} layout="horizontal" align="start" />
                </DetailCardModule>
                </DocDemo>
            </DocSection>
            <DocSection title="Value at the end of the row">
                <DocParagraph>The label and the value share a row. The value sits at the right.</DocParagraph>
                <DocDemo className="max-w-3xl">
                <DetailCardModule title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary">Edit</Button>}>
                    <DescriptionList items={facts} layout="horizontal" align="end" />
                </DetailCardModule>
                </DocDemo>
            </DocSection>
            <DocSection title="Picture, badge, and link">
                <DocParagraph>A group can hold a picture, a badge, or a link with the facts.</DocParagraph>
                <DocDemo className="max-w-3xl">
                <DetailCardModule title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary">Edit</Button>}>
                    <DetailGroup title="Profile">
                        <Avatar name="Alex Kim" />
                        <DescriptionList
                            items={[...facts, { label: "Plan", value: <Badge variant="success">Pro</Badge> }]}
                            layout="horizontal"
                            align="start"
                        />
                    </DetailGroup>
                    <DetailGroup title="Links" divider>
                        <Anchor items={[{ href: "#profile", label: "Profile" }, { href: "#access", label: "Access" }]} />
                    </DetailGroup>
                </DetailCardModule>
                </DocDemo>
            </DocSection>
            <DocSection title="Tabs">
                <DocParagraph>Use tabs when the parts are weakly related. Each tab is one part, such as profile, access, or activity.</DocParagraph>
                <DocDemo className="max-w-3xl">
                <DetailCardModule title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary">Edit</Button>}>
                    <Tabs
                        defaultValue="profile"
                        items={[
                            { value: "profile", label: "Profile", content: <DescriptionList items={facts} layout="horizontal" align="start" /> },
                            {
                                value: "access",
                                label: "Access",
                                content: (
                                    <DescriptionList
                                        items={[{ label: "Team", value: "North" }, { label: "Visibility", value: "Team" }]}
                                        layout="horizontal"
                                        align="start"
                                    />
                                ),
                            },
                            { value: "activity", label: "Activity", content: <p className="text-sm text-muted">Nothing has happened yet.</p> },
                        ]}
                    />
                </DetailCardModule>
                </DocDemo>
            </DocSection>
            <DocSection title="Steps">
                <DocParagraph>Use steps for a process. The actions, such as approve and reject, sit with the record.</DocParagraph>
                <DocDemo className="max-w-3xl">
                <DetailCardModule
                    title="North workspace"
                    status="In review"
                    statusVariant="warning"
                    action={
                        <div className="flex gap-spacing-03">
                            <Button variant="secondary">Reject</Button>
                            <Button>Approve</Button>
                        </div>
                    }
                >
                    <DetailGroup title="Progress">
                        <Steps items={["Submitted", "Review", "Decision"]} current={1} />
                    </DetailGroup>
                    <DetailGroup title="Request" divider>
                        <DescriptionList
                            items={[
                                { label: "Owner", value: "Alex Kim" },
                                { label: "Region", value: "Hangzhou" },
                            ]}
                            layout="horizontal"
                            align="start"
                        />
                    </DetailGroup>
                </DetailCardModule>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
