import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../base/avatar";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { DescriptionList } from "../base/description-list";
import { DetailGroup } from "../base/detail-group";
import { Anchor } from "../navigation/anchor";
import { Steps } from "../navigation/steps";
import { Tabs } from "../navigation/tabs";
import { DocList, DocPage, DocSection } from "../templates/doc";
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
        <DocPage title="Detail" intro="A detail is one object: its name, its status, the action that belongs to it, and its groups. A group holds facts, and it can also hold a picture, a badge, or a link. A large object uses tabs. A process uses steps. A fact can put its label above the value, or beside it with the value on the left or the right.">
            <DocSection title="When to use">
                <DocList
                    items={[
                        { title: "A simple record", body: "Little content, one level. One card, split into groups with lines." },
                        { title: "A review", body: "The object has a process. Show the decision and the actions, such as approve or reject, with the record." },
                        { title: "A large object", body: "Weakly related parts get tabs, such as profile, access, and activity. Steps are for a process the person moves through." },
                    ]}
                />
            </DocSection>
            <DocSection title="Record">
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
            </DocSection>
            <DocSection title="Stacked">
                <DetailCardModule title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary">Edit</Button>}>
                    <DescriptionList items={facts} />
                </DetailCardModule>
            </DocSection>
            <DocSection title="Horizontal, left">
                <DetailCardModule title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary">Edit</Button>}>
                    <DescriptionList items={facts} layout="horizontal" align="start" />
                </DetailCardModule>
            </DocSection>
            <DocSection title="Horizontal, right">
                <DetailCardModule title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary">Edit</Button>}>
                    <DescriptionList items={facts} layout="horizontal" align="end" />
                </DetailCardModule>
            </DocSection>
            <DocSection title="Picture, badge, and link">
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
            </DocSection>
            <DocSection title="Large object">
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
            </DocSection>
            <DocSection title="Review">
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
            </DocSection>
        </DocPage>
    ),
};
