import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, tableStatesSnippet } from "../../../../../.storybook/story-snippets";
import { DocDemo, DocCodeSection, DocPage, DocSection, DocWhenAvoid } from "../../../templates/doc";
import { Table } from "../table";
import { columns, members } from "./fixtures";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const States: Story = {
    name: "States",
    render: () => (
        <DocPage title="States" intro="Loading, error, empty, and density are explicit states. Match empty copy to meaning. A table empty is copy in the table. A panel with no items uses Empty state.">
            <DocCodeSection note={libraryExportNote} code={tableStatesSnippet} />
            <DocSection title="Example">
                <DocWhenAvoid
                    when="loading shows Loader rows. error keeps the header and shows a message. empty is copy when there are no items. A search or filter with no hits uses built-in no matches copy. density changes row padding."
                    avoid="Do not show an empty table with no sentence. Set disabled on an item so it stays visible but cannot be selected."
                />
                <DocDemo>
                    <div className="flex flex-col gap-spacing-06">
                        <Table label="Loading members" items={[]} columns={columns} loading />
                        <Table label="Missing members" items={[]} columns={columns} error="Members could not be loaded." />
                        <Table label="Empty members" items={[]} columns={columns} empty="No members yet" />
                        <Table label="Dense members" items={members} columns={columns} density="dense" defaultValue="alex" />
                        <Table label="Wide members" items={members} columns={columns} density="wide" defaultValue="alex" />
                    </div>
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
