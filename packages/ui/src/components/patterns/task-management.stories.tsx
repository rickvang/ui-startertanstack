import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositionNote, taskManagementSnippet } from "../../../.storybook/story-snippets";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { Layout } from "../layout/layout";
import { DetailCard } from "../modules/detail-card";
import { Table, type TableItem } from "../modules/table";
import { Menu } from "../navigation/menu";
import { DocBullets, DocCodeSection, DocDemo, DocPage, DocParagraph, DocSection } from "../templates/doc";

const tasks: readonly TableItem[] = [
    { id: "alex", name: "Alex Kim needs a review", status: "Review", statusVariant: "warning" },
    { id: "jordan", name: "Jordan Lee accepted the invite", status: "Active", statusVariant: "success" },
    { id: "billing", name: "Billing access", status: "Blocked", statusVariant: "danger" },
];

const meta = {
    title: "Patterns/Task management",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TaskManagement: Story = {
    name: "Task management",
    render: () => {
        const [task, setTask] = useState("alex");

        return (
            <DocPage title="Task management" intro="A queue. Status comes first. Opening an item shows the record, or why the task cannot continue.">
                <DocSection title="Example">
                    <DocParagraph>Pick a row. Billing shows why the work cannot continue. The others open the record.</DocParagraph>
                    <DocDemo bleed>
                        <Layout
                            header={<span className="font-semibold text-ink">Studio</span>}
                            sider={<Menu className="w-full" items={[{ value: "projects", label: "Projects" }, { value: "members", label: "Members" }, { value: "settings", label: "Settings" }]} defaultValue="projects" />}
                            siderPlacement="full-height"
                        >
                            <div className="flex flex-col gap-spacing-04">
                                <div className="flex gap-spacing-03">
                                    <Badge variant="success">3 active</Badge>
                                    <Badge variant="warning">1 review</Badge>
                                </div>
                                <Table label="Tasks" items={tasks} value={task} onValueChange={setTask} />
                                {task === "billing" ? (
                                    <div className="flex max-w-sm flex-col items-start gap-spacing-03">
                                        <h3 className="text-sm font-semibold text-ink">You do not have access</h3>
                                        <p className="text-sm text-muted">Ask an owner to add you to billing.</p>
                                        <Button variant="secondary" onClick={() => setTask("alex")}>
                                            Back to the queue
                                        </Button>
                                    </div>
                                ) : (
                                    <DetailCard title={task === "jordan" ? "Jordan Lee" : "Alex Kim"} status={task === "jordan" ? "Active" : "Review"} statusVariant={task === "jordan" ? "success" : "warning"} action={<Button>Open</Button>}>
                                        <p className="text-sm text-ink">{task === "jordan" ? "The invite was accepted." : "This review is waiting on an owner."}</p>
                                    </DetailCard>
                                )}
                            </div>
                        </Layout>
                    </DocDemo>
                </DocSection>
                <DocSection title="When to use">
                    <DocBullets items={["The person works through items that need a decision or a next step.", "A blocked item must explain why, not look like an empty detail."]} />
                </DocSection>
                <DocSection title="When not to use">
                    <DocBullets
                        items={[
                            "Many records of the same kind, with no queue. Use a table.",
                            "One record with no list beside it. Use a detail.",
                        ]}
                    />
                </DocSection>
                <DocCodeSection note={compositionNote} code={taskManagementSnippet} />
            </DocPage>
        );
    },
};
