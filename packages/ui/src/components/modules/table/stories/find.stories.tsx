import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocDemo, DocPage, DocSection, DocWhenAvoid } from "../../../templates/doc";
import { Table } from "../table";
import { directory, directoryColumns } from "./fixtures";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Find: Story = {
    name: "Find",
    render: () => (
        <DocPage title="Find" intro="searchable, filterable, and sortable help people narrow a directory they already understand.">
            <DocSection title="Example">
                <DocWhenAvoid
                    when="searchable matches visible text (including nested children). filterable adds status chips from the items you pass. sortable cycles none, ascending, and descending on one column at a time."
                    avoid="The table does not fetch. Replace items when the server responds, or pre-process items yourself for remote search."
                />
                <DocDemo>
                    <Table label="Directory" items={directory} columns={directoryColumns} searchable filterable sortable defaultValue="alex" />
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
