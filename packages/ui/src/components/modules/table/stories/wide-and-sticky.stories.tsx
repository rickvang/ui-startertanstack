import type { Meta, StoryObj } from "@storybook/react-vite";
import { libraryExportNote, tableWideStickySnippet } from "../../../../../.storybook/story-snippets";
import { DocDemo, DocCodeSection, DocPage, DocSection, DocWhenAvoid } from "../../../templates/doc";
import { Table } from "../table";
import { directory, directoryColumns } from "./fixtures";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const WideAndSticky: Story = {
    name: "Wide and sticky",
    render: () => (
        <DocPage title="Wide and sticky" intro="Many columns scroll sideways while the header and name column stay visible.">
            <DocCodeSection note={libraryExportNote} code={tableWideStickySnippet} />
            <DocSection title="Example">
                <DocWhenAvoid
                    when="stickyHeader keeps the header in the scroll frame. stickyColumn pins the name column when many columns scroll sideways. Use both together on wide grids."
                    avoid="stickyColumn applies to the name column in a column grid. A list without columns stays a list of buttons. Column resize, reorder, and extra pinned columns wait. Choose visible fields with the Columns control."
                />
                <DocDemo className="overflow-x-auto">
                    <Table label="Wide directory" items={directory} columns={directoryColumns} stickyHeader stickyColumn sortable defaultValue="alex" />
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
