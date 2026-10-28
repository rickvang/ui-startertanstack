import type { Meta, StoryObj } from "@storybook/react-vite";
import { copyableDocs, libraryExportNote } from "../../../.storybook/copyable-snippets";
import { cardSnippet } from "../../../.storybook/story-snippets";
import { Avatar } from "../base/avatar";
import { Badge } from "../base/badge";
import { Button } from "../base/button";
import { Card } from "./card";

const activeTrend = ["h-spacing-02", "h-spacing-03", "h-spacing-02", "h-spacing-04", "h-spacing-03", "h-spacing-05", "h-spacing-04"] as const;
const overdueTrend = ["h-spacing-02", "h-spacing-02", "h-spacing-03", "h-spacing-03", "h-spacing-04", "h-spacing-04", "h-spacing-05"] as const;

const meta = {
    title: "Components/Card",
    component: Card,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `${libraryExportNote} Import \`theme.css\` once in the app or Storybook preview.`,
            },
        },
    },
    args: {
        children: "North team",
        variant: "outlined",
    },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
    parameters: {
        docs: copyableDocs(cardSnippet, libraryExportNote),
    },
};

export const Raised: Story = {
    args: { variant: "raised" },
};

export const Quiet: Story = {
    args: { variant: "quiet" },
};

export const Variants: Story = {
    render: () => (
        <div className="flex items-center gap-spacing-04">
            <Card variant="outlined">Outlined</Card>
            <Card variant="raised">Raised</Card>
            <Card variant="quiet">Quiet</Card>
        </div>
    ),
};

export const Metric: Story = {
    render: () => (
        <div className="grid gap-spacing-03 sm:grid-cols-2">
            <Card className="gap-spacing-02 p-spacing-04">
                <p className="text-xs text-muted">Active</p>
                <div className="flex items-end gap-spacing-04">
                    <p className="text-lg font-semibold text-ink tabular-nums">24</p>
                    <div className="flex h-spacing-05 items-end gap-px" aria-hidden="true">
                        {activeTrend.map((height, index) => (
                            <span key={index} className={`w-spacing-02 bg-accent ${height}`} />
                        ))}
                    </div>
                </div>
                <Badge className="self-start" variant="success">
                    +3 this week
                </Badge>
            </Card>
            <Card className="gap-spacing-02 p-spacing-04">
                <p className="text-xs text-muted">Overdue</p>
                <div className="flex items-end gap-spacing-04">
                    <p className="text-lg font-semibold text-ink tabular-nums">4</p>
                    <div className="flex h-spacing-05 items-end gap-px" aria-hidden="true">
                        {overdueTrend.map((height, index) => (
                            <span key={index} className={`w-spacing-02 bg-danger ${height}`} />
                        ))}
                    </div>
                </div>
                <Badge className="self-start" variant="danger">
                    +1 this week
                </Badge>
            </Card>
        </div>
    ),
};

export const Article: Story = {
    render: () => (
        <Card className="max-w-xl overflow-hidden p-0">
            <div className="h-spacing-11 bg-accent-subtle" />
            <div className="flex flex-col gap-spacing-03 p-spacing-05">
                <Badge className="self-start">Note</Badge>
                <h2 className="text-sm font-semibold text-ink">How the North team reviews work</h2>
                <p className="text-sm text-muted">Who signs off before a visit is marked done.</p>
                <p className="text-xs text-muted">Ada North · Today</p>
            </div>
        </Card>
    ),
};

export const Person: Story = {
    render: () => (
        <Card className="max-w-xl">
            <div className="flex items-center gap-spacing-03">
                <Avatar name="Ada North" />
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">Ada North</p>
                    <p className="text-sm text-muted">Reviewer</p>
                </div>
                <Badge className="ml-auto" variant="success">
                    Active
                </Badge>
            </div>
        </Card>
    ),
};

export const NextStep: Story = {
    name: "Next step",
    render: () => (
        <Card variant="quiet" className="max-w-xl">
            <h2 className="text-sm font-semibold text-ink">Invite the rest of the team</h2>
            <p className="text-sm text-muted">Three seats are still open.</p>
            <Button variant="secondary" size="dense" className="self-start">
                Invite
            </Button>
        </Card>
    ),
};
