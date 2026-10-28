import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, membersTableSnippet } from "../../../../../.storybook/story-snippets";
import { DocDemo, DocCodeSection, DocPage, DocSection, DocWhenAvoid } from "../../../templates/doc";
import { Table } from "../table";
import { columns, members } from "./fixtures";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Members: Story = {
    name: "Members",
    render: () => (
        <DocPage title="Members" intro="Start with label, items, columns, and row selection. Add search, filters, bulk actions, and virtualization only when the workflow needs them.">
            <DocCodeSection note={libraryExportNote} code={membersTableSnippet} />
            <DocSection title="Example">
                <DocWhenAvoid
                    when="Pass id, name, status, statusVariant on each item; put other fields in values and links in hrefs. Wire selection with value, defaultValue, and onValueChange."
                    avoid="Do not turn on search, filters, bulk actions, or virtualization until the workflow needs them."
                />
                <DocDemo>
                    <Table label="Members" items={members} columns={columns} defaultValue="alex" />
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
