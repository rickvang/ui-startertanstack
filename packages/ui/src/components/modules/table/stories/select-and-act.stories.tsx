import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocDemo, DocList, DocPage, DocSection, DocWhenAvoid } from "../../../templates/doc";
import { Table } from "../table";
import { directory, directoryColumns } from "./fixtures";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectAndAct: Story = {
    name: "Select and act",
    render: () => (
        <DocPage title="Select and act" intro="Multi-select, pagination, row actions, and bulk actions for working through a directory in batches.">
            <DocSection title="Example">
                <DocList
                    items={[
                        { title: "Selection", body: "selectable=\"multiple\" adds checkboxes. The header checkbox selects the visible page; the bulk bar can select every match." },
                        { title: "Actions", body: "Each row opens one actions menu. It closes on a choice, Escape, or an outside click. Checkboxes and menus do not change the selected row." },
{ title: "Columns", body: "columnSettings adds the Columns menu beside the count. Name stays. Actions stays. The other fields can leave the view." },
                    ]}
                />
                <DocWhenAvoid avoid="Do not stack expand, virtualization, and every toolbar flag on one screen unless the task truly needs it." />
                <DocDemo>
                    <Table
                        label="Directory selection"
                        items={directory}
                        columns={directoryColumns}
                        selectable="multiple"
                        columnSettings
                        pageSize={2}
                        pageSizeOptions={[2, 4]}
                        rowActions={[{ id: "open", label: "Open" }, { id: "copy", label: "Copy link" }]}
                        bulkActions={[{ id: "export", label: "Export" }]}
                        defaultValue="alex"
                    />
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
