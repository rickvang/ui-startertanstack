/** Curated copy-paste examples keyed by Storybook area. Keep aligned with default stories. */

import {
    catalogSetupSnippet,
    copyableDocs,
    drawerCompositionSnippet,
    libraryExportNote,
    librarySnippet,
    membersTableSnippet,
    moduleSnippet,
    patternSnippet,
    projectFormSnippet,
} from "./copyable-snippets";

export { catalogSetupSnippet, compositionNote, drawerCompositionSnippet, libraryExportNote, membersTableSnippet } from "./copyable-snippets";

export function docsFromSnippet(code: string) {
    return {
        parameters: {
            docs: copyableDocs(code, libraryExportNote),
        },
    };
}

export const avatarSnippet = librarySnippet("Avatar", '<Avatar name="Alex Kim" />', "MemberAvatar");

export const badgeSnippet = librarySnippet('Badge', '<Badge variant="success">Active</Badge>', "StatusBadge");

export const checkboxSnippet = librarySnippet(
    "Checkbox",
    '<Checkbox label="Email me when someone joins" defaultChecked />',
    "NotifyCheckbox",
);

export const descriptionListSnippet = librarySnippet(
    "DescriptionList",
    `<DescriptionList
    items={[
        { label: "Owner", value: "Alex Kim" },
        { label: "Region", value: "North America" },
    ]}
/>`,
    "ProjectFacts",
);

export const detailGroupSnippet = librarySnippet(
    "DescriptionList, DetailGroup",
    `<DetailGroup title="Profile">
    <DescriptionList
        items={[
            { label: "Role", value: "Owner" },
            { label: "Lives in", value: "Hangzhou" },
        ]}
        layout="horizontal"
        align="start"
    />
</DetailGroup>`,
    "ProfileDetailGroup",
);

export const fieldSnippet = librarySnippet(
    "Field",
    `<Field label="Project name" hint="Shown on the project home.">
    <input className="rounded-md border border-line px-spacing-03 py-spacing-02" defaultValue="Studio" />
</Field>`,
    "ProjectNameField",
);

export const fieldsetSnippet = librarySnippet(
    "Fieldset, TextField",
    `<Fieldset title="Project" className="w-full max-w-md">
    <TextField label="Project name" defaultValue="Studio" />
</Fieldset>`,
    "ProjectFieldset",
);

export const loaderSnippet = librarySnippet('Loader', '<Loader label="Loading members" />', "MembersLoader");

export const messageSnippet = librarySnippet(
    "Message",
    '<Message tone="success">North saved your changes.</Message>',
    "SaveMessage",
);

export const radioSnippet = librarySnippet(
    "RadioGroup",
    `<RadioGroup
    label="Default role"
    defaultValue="member"
    options={[
        { value: "member", label: "Member" },
        { value: "admin", label: "Admin" },
    ]}
/>`,
    "DefaultRoleRadio",
);

export const selectSnippet = librarySnippet(
    "Select",
    `<Select
    label="Region"
    defaultValue="north"
    options={[
        { value: "north", label: "North" },
        { value: "south", label: "South" },
    ]}
/>`,
    "RegionSelect",
);

export const switchSnippet = librarySnippet(
    "Switch",
    '<Switch label="Allow invites" defaultChecked />',
    "InvitesSwitch",
);

export const textAreaSnippet = librarySnippet(
    "TextArea",
    '<TextArea label="Description" defaultValue="The design system for North." />',
    "ProjectDescription",
);

export const textFieldSnippet = librarySnippet(
    "TextField",
    '<TextField label="Project name" hint="Shown on the project home screen." />',
    "ProjectName",
);

export const anchorSnippet = librarySnippet(
    "Anchor",
    `<Anchor
    items={[
        { href: "#overview", label: "Overview" },
        { href: "#members", label: "Members" },
    ]}
/>`,
    "SectionAnchor",
);

export const breadcrumbSnippet = librarySnippet(
    "Breadcrumb",
    `<Breadcrumb
    items={[
        { label: "North", href: "/" },
        { label: "Members", href: "/members" },
    ]}
/>`,
    "MembersBreadcrumb",
);

export const dropdownSnippet = librarySnippet(
    "Dropdown",
    `<Dropdown label="Actions" items={["Edit", "Remove"]} />`,
    "RowActionsDropdown",
);

export const menuSnippet = librarySnippet(
    "Menu",
    `<Menu
    defaultValue="profile"
    items={[
        { value: "profile", label: "Profile" },
        { value: "sign-out", label: "Sign out" },
    ]}
/>`,
    "AccountMenu",
);

export const paginationSnippet = librarySnippet(
    "Pagination",
    '<Pagination total={8} defaultPage={2} onPageChange={() => undefined} />',
    "MembersPagination",
);

export const stepsSnippet = librarySnippet(
    "Steps",
    `<Steps current={1} items={["Project", "Members", "Review"]} />`,
    "OnboardingSteps",
);

export const tabsSnippet = librarySnippet(
    "Tabs",
    `<Tabs
    defaultValue="members"
    items={[
        { value: "members", label: "Members", content: "Alex Kim, Jordan Lee" },
        { value: "settings", label: "Settings", content: "Project name and access." },
    ]}
/>`,
    "ProjectTabs",
);

export const dialogSnippet = `${catalogSetupSnippet}
import { useState } from "react";
import { Button, Dialog } from "@ui-starter/ui";

export function RemoveProductDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Remove</Button>
      {open ? (
        <Dialog
          title="Remove North"
          confirmLabel="Remove"
          onCancel={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        >
          Removing the product deletes its projects. This cannot be undone.
        </Dialog>
      ) : null}
    </>
  );
}`;

export const dividerSnippet = librarySnippet("Divider", '<Divider />', "SectionDivider");

export const flexSnippet = librarySnippet(
    "Badge, Button, Flex",
    `<Flex gap="md">
    <Badge variant="success">Active</Badge>
    <Button variant="secondary">Edit</Button>
</Flex>`,
    "StatusRow",
);

export const gridSnippet = librarySnippet(
    "Badge, Grid",
    `<Grid columns={3}>
    <Badge variant="neutral">Draft</Badge>
    <Badge variant="success">Active</Badge>
    <Badge variant="warning">Review</Badge>
</Grid>`,
    "StatusGrid",
);

export const masonrySnippet = librarySnippet(
    "Masonry, Message",
    `<Masonry>
    <Message tone="success">North saved your changes.</Message>
    <Message tone="danger">Review required.</Message>
</Masonry>`,
    "NoticeMasonry",
);

export const spaceSnippet = librarySnippet(
    "Button, Space",
    `<Space gap="md">
    <Button>Save</Button>
    <Button variant="secondary">Cancel</Button>
</Space>`,
    "FormActionsSpace",
);

export const splitterSnippet = librarySnippet(
    "Splitter",
    `<Splitter start="Members" end="Details" />`,
    "MembersSplitter",
);

export const stackSnippet = librarySnippet(
    "Stack, TextField",
    `<Stack gap="md">
    <TextField label="Project name" />
    <TextField label="Region" />
</Stack>`,
    "ProjectStack",
);

export const layoutSnippet = `${catalogSetupSnippet}
import { Layout } from "@ui-starter/ui";

// Layout frames are exported; fill header, sider, and children for your shell.
export function AppLayout() {
  return (
    <Layout header={<header>North</header>} sider={<nav>Menu</nav>}>
      <main className="p-spacing-05">Page content</main>
    </Layout>
  );
}`;

export const formSummarySnippet = projectFormSnippet;

export const formPendingSnippet = librarySnippet(
    "Button, Fieldset, Form, FormSubmit, TextField",
    `<Form label="Project" onSubmit={() => undefined} pending>
    <Fieldset title="Project" className="w-full max-w-md">
        <TextField label="Project name" defaultValue="Studio" />
        <FormSubmit>Save</FormSubmit>
    </Fieldset>
</Form>`,
    "SavingProjectForm",
);

export const modalCompositionSnippet = drawerCompositionSnippet.replace("drawer task", "modal content").replace(
    "ListWithDrawer",
    "ConfirmInModal",
);

export const slideInCompositionSnippet = `${catalogSetupSnippet}
// Story composition — not exported from @ui-starter/ui.
export function ListWithSlideIn() {
  return (
    <div className="relative flex h-80 max-w-xl overflow-hidden rounded-md border border-line bg-canvas">
      <div className="min-w-0 flex-1 p-spacing-04">{/* list */}</div>
      <aside className="absolute top-spacing-04 right-spacing-04 w-spacing-12 rounded-md border border-line bg-surface p-spacing-04 shadow-lg">
        {/* slide-in task */}
      </aside>
    </div>
  );
}`;

export const detailCardSnippet = moduleSnippet(
    "Button, DetailCard",
    `<DetailCard title="Alex Kim" status="Active" statusVariant="success" action={<Button variant="secondary">Edit</Button>}>
    <p className="text-sm text-muted">Profile facts go here.</p>
</DetailCard>`,
    "ProductDetailCard",
);

export const formGroupModuleSnippet = moduleSnippet(
    "Button, FormGroup, TextField",
    `<FormGroup title="Project">
    <TextField label="Project name" defaultValue="Studio" />
    <div className="flex gap-spacing-03">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
    </div>
</FormGroup>`,
    "ProjectFormGroup",
);

export const shellSnippet = moduleSnippet(
    "Shell",
    `<Shell
    frame="side-header"
    product="North"
    navigation={<nav>Domains</nav>}
    settings={<button type="button">Settings</button>}
    header={<header>Members</header>}
    help={<button type="button">Help</button>}
    user={<span>AK</span>}
>
    <main className="p-spacing-05">Members</main>
</Shell>`,
    "MembersShell",
);

export const settingsScreenSnippet = moduleSnippet(
    "SettingsScreen",
    `<SettingsScreen
    facts={{ name: "North", description: "The design system.", invite: "owners", membersCanCreate: true }}
    removed={false}
    onChange={() => undefined}
    onRemove={() => undefined}
/>`,
    "NorthSettings",
);

export const accountScreenSnippet = moduleSnippet(
    "AccountScreen",
    `<AccountScreen
    facts={{ name: "Alex Kim", email: "alex@example.com", emailNotices: true, language: "english" }}
    removed={false}
    onChange={() => undefined}
    onRemove={() => undefined}
/>`,
    "OwnerAccount",
);

export const tableFindSnippet = membersTableSnippet.replace(
    'defaultValue="alex"',
    "searchable filterable sortable columnSettings defaultValue=\"alex\"",
);

export const tableExpandSnippet = `${membersTableSnippet.replace(
    "return <Table label=\"Members\" items={members} columns={columns} defaultValue=\"alex\" />;",
    "return (\n        <Table\n            label=\"Members\"\n            items={members}\n            columns={columns}\n            defaultValue=\"alex\"\n            expandable\n            renderDetail={() => <p className=\"p-spacing-04 text-sm text-muted\">Extra fields under the row.</p>}\n        />\n    );",
)}`;

export const tableSelectActSnippet = membersTableSnippet.replace(
    "defaultValue=\"alex\"",
    'selectable="multiple" defaultValue="alex"',
);

export const tableStatesSnippet = membersTableSnippet.replace(
    'items={members}',
    "items={members} loading",
);

export const tableLongListSnippet = membersTableSnippet.replace(
    'items={members}',
    "items={members} virtualize",
);

export const tableWideStickySnippet = membersTableSnippet.replace(
    'items={members}',
    "items={members} stickyHeader stickyColumn",
);

export const patternsOverviewSnippet = patternSnippet(
    "Button, FormGroup, TextField",
    `<FormGroup title="Project">
    <TextField label="Project name" />
    <Button>Save</Button>
</FormGroup>`,
    "PatternExample",
);

export const modifyingRecordSnippet = patternSnippet(
    "Button, Form, FormSubmit, TextField",
    `<Form label="Project" onSubmit={() => undefined}>
    <TextField label="Project name" defaultValue="Studio" />
    <FormSubmit>Save</FormSubmit>
</Form>`,
    "EditProjectRecord",
);

export const inlineEditSnippet = patternSnippet(
    "TextField",
    '<TextField label="Project name" defaultValue="Studio" layout="horizontal" className="max-w-md" />',
    "InlineProjectName",
);

export const wizardSnippet = patternSnippet(
    "Button, Steps, TextField",
    `<Steps current={0} items={["Project", "Members"]} />
<TextField label="Project name" />
<Button>Continue</Button>`,
    "CreateProjectWizard",
);

export const onboardingSnippet = wizardSnippet;

export const taskManagementSnippet = patternSnippet(
    "Table, type TableColumn, type TableItem",
    `<Table
    label="Tasks"
    items={[{ id: "1", name: "Review", status: "Open", statusVariant: "warning", values: {} }]}
    columns={[{ id: "name", header: "Name", kind: "name" }, { id: "status", header: "Status", kind: "status" }]}
/>`,
    "TaskBoardTable",
);

export const visualizationPageSnippet = patternSnippet(
    "Shell",
    `<Shell
    frame="side-header"
    product="North"
    navigation={<nav>Insights</nav>}
    settings={<button type="button">Settings</button>}
    header={<header>North</header>}
    help={<button type="button">Help</button>}
    user={<span>AK</span>}
>
    <main className="p-spacing-05">{/* charts */}</main>
</Shell>`,
    "InsightsPage",
);

export const navigatingDomainsSnippet = shellSnippet;

export const switchingOrganizationsSnippet = shellSnippet;

export const productSettingsSnippet = settingsScreenSnippet;

export const accountInformationSnippet = accountScreenSnippet;

export const globalRulesMessageSnippet = messageSnippet;

export const globalRulesEmptySnippet = librarySnippet(
    "Message",
    '<Message tone="neutral">No members yet. Invite someone to get started.</Message>',
    "EmptyMembersMessage",
);

export const templatesOverviewSnippet = `${catalogSetupSnippet}
import { Button, TextField } from "@ui-starter/ui";

// Start from library exports; compose patterns in the app.
export function StarterForm() {
  return (
    <form className="flex max-w-md flex-col gap-spacing-04">
      <TextField label="Project name" />
      <Button>Save</Button>
    </form>
  );
}`;
