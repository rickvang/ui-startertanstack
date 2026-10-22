import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { cx } from "../../utils/cx";
import { DocList, DocPage, DocSection } from "../templates/doc";
import { Layout, type LayoutProps } from "./layout";

function Bone({ className }: { className: string }) {
    return <span className={cx("block rounded-sm bg-line", className)} />;
}

function BarRow({ children }: { children: ReactNode }) {
    return <div className="flex items-center gap-spacing-03">{children}</div>;
}

function NavBones({ current = 0 }: { current?: number }) {
    const widths = ["w-spacing-10", "w-spacing-09", "w-spacing-08", "w-spacing-10"] as const;
    return (
        <div className="flex flex-col gap-spacing-02">
            {widths.map((width, index) =>
                index === current ? (
                    <div key={`${width}-${index}`} className="rounded-sm bg-selected px-spacing-02 py-spacing-02">
                        <Bone className={cx("h-spacing-04 bg-neutral-500", width)} />
                    </div>
                ) : (
                    <Bone key={`${width}-${index}`} className={cx("h-spacing-04", width)} />
                ),
            )}
        </div>
    );
}

function PublicHeader() {
    return (
        <BarRow>
            <Bone className="h-spacing-04 w-spacing-08" />
            <Bone className="h-spacing-03 w-spacing-07" />
            <Bone className="h-spacing-03 w-spacing-07" />
            <Bone className="ml-auto h-spacing-04 w-spacing-05 rounded-full" />
        </BarRow>
    );
}

function PublicContent() {
    return (
        <div className="flex flex-col gap-spacing-04">
            <Bone className="h-spacing-05 w-spacing-12" />
            <Bone className="h-spacing-03 w-full" />
            <Bone className="h-spacing-03 w-4/5" />
            <Bone className="h-spacing-11 w-full" />
        </div>
    );
}

function PublicFooter() {
    return (
        <BarRow>
            <Bone className="h-spacing-03 w-spacing-07" />
            <Bone className="h-spacing-03 w-spacing-08" />
            <Bone className="h-spacing-03 w-spacing-06" />
        </BarRow>
    );
}

function DocsHeader() {
    return (
        <BarRow>
            <Bone className="h-spacing-04 w-spacing-08" />
            <Bone className="ml-auto h-spacing-03 w-spacing-07" />
            <Bone className="h-spacing-04 w-spacing-05 rounded-full" />
        </BarRow>
    );
}

function Article() {
    return (
        <div className="flex flex-col gap-spacing-04">
            <Bone className="h-spacing-03 w-spacing-11" />
            <Bone className="h-spacing-05 w-spacing-13" />
            <Bone className="h-spacing-03 w-full" />
            <Bone className="h-spacing-03 w-full" />
            <Bone className="h-spacing-03 w-3/5" />
        </div>
    );
}

function AppSider() {
    return (
        <div className="flex flex-col gap-spacing-05">
            <Bone className="h-spacing-04 w-spacing-08" />
            <NavBones current={0} />
        </div>
    );
}

function AppHeader() {
    return (
        <BarRow>
            <Bone className="h-spacing-03 w-spacing-08" />
            <Bone className="h-spacing-03 w-spacing-07" />
            <span className="rounded-sm bg-selected px-spacing-02 py-spacing-01">
                <Bone className="h-spacing-04 w-spacing-09 bg-neutral-500" />
            </span>
            <Bone className="ml-auto h-spacing-07 w-spacing-09 rounded-md" />
        </BarRow>
    );
}

function AppContent() {
    return (
        <div className="flex flex-col gap-spacing-04">
            <Bone className="h-spacing-05 w-spacing-11" />
            <Bone className="h-spacing-08 w-full" />
            <Bone className="h-spacing-08 w-full" />
        </div>
    );
}

function ToolSider() {
    return (
        <div className="flex flex-col gap-spacing-03">
            <Bone className="h-spacing-03 w-spacing-08" />
            <NavBones />
        </div>
    );
}

function ToolCanvas() {
    return (
        <div className="flex min-h-spacing-12 flex-col gap-spacing-04">
            <BarRow>
                <Bone className="h-spacing-04 w-spacing-05" />
                <Bone className="h-spacing-04 w-spacing-05" />
                <Bone className="h-spacing-04 w-spacing-05" />
            </BarRow>
            <Bone className="min-h-spacing-11 w-full flex-1" />
        </div>
    );
}

const meta = {
    title: "Layout/Frames",
    component: Layout,
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

function Frame({ name, when, avoid, ...props }: LayoutProps & { name: string; when: string; avoid: string }) {
    return (
        <div className="flex flex-col gap-spacing-04">
            <Layout {...props} />
            <div className="flex flex-col gap-spacing-02">
                <h3 className="text-sm font-medium">{name}</h3>
                <p className="text-sm text-muted">{when}</p>
                <p className="text-sm text-muted">{avoid}</p>
            </div>
        </div>
    );
}

function FrameNote({ children }: { children: ReactNode }) {
    return <p className="text-sm text-muted">{children}</p>;
}

export const Standard: Story = {
    args: { children: "Content" },
    render: () => (
        <DocPage title="Frames" intro="A frame decides where the shell's areas sit. Pick it from how people move. A product uses one variation. The same product can still use another frame for a public page. The areas that fill the frame are in Modules / Shell.">
            <DocSection title="How to choose">
                <DocList
                    items={[
                        { title: "Few destinations", body: "Header, content, footer. People read down the page. The top bar has room for a short set of links." },
                        { title: "A global bar and a section menu", body: "Header, then side. The top bar is the product. The side belongs to the section they are in." },
                        { title: "Many areas, used often", body: "Side, then header. The side is how people switch areas. The header belongs only to the current area." },
                        { title: "One tool", body: "Side and content. There is no product bar and no footer. The side is the structure of the work." },
                    ]}
                />
            </DocSection>
            <DocSection title="Navigation">
                <DocList
                    items={[
                        { title: "One product menu", body: "The side or the top bar is the product navigation. A breadcrumb is the path inside the current area. They are not two equal menus." },
                        { title: "Current is strongest", body: "The current item uses medium type on the selected fill. Ancestors stay quiet." },
                        { title: "Header matches the frame", body: "In an app, the header belongs to the current area. It does not repeat the product menu." },
                    ]}
                />
                <Frame name="Path inside the area" when="The side is the one menu. The header is the path: quiet ancestors, then the current page on the selected fill." avoid="Do not put a second copy of the product menu in the header." header={<AppHeader />} sider={<AppSider />} siderPlacement="full-height">
                    <Article />
                </Frame>
            </DocSection>
            <DocSection title="Header, content, footer">
                <FrameNote>Use this when the page is read from top to bottom and the first-level links fit in one bar. A marketing page, a simple home, or a document with a stable width.</FrameNote>
                <Frame name="Header, content, footer" when="The top bar carries the product name and a short set of links. The footer holds secondary links, such as legal or help. It does not hold the main task." avoid="Skip this frame when the section menu is long, or when people switch areas all day. A top bar runs out of room, and a footer steals space from the work." header={<PublicHeader />} footer={<PublicFooter />}>
                    <PublicContent />
                </Frame>
            </DocSection>
            <DocSection title="Header, then side">
                <FrameNote>Use this for docs, settings, and help. People arrive from the product, then move within one section.</FrameNote>
                <Frame name="Header, then side" when="The top bar spans the page and stays global: product name, account, and the few areas that are not this section. The side is the menu of the current section." avoid="Do not put the product menu in the side and again in the header. Do not use this for an app where switching areas is the main job. That side should run the full height." header={<DocsHeader />} sider={<NavBones current={0} />}>
                    <Article />
                </Frame>
            </DocSection>
            <DocSection title="Side, then header">
                <FrameNote>Use this for an application people return to. The side is stable. The header changes with the area.</FrameNote>
                <Frame name="Side, then header" when="The side is the product menu and stays on screen. The header names the current area and holds that area's actions, such as a breadcrumb or Invite. Content is the work." avoid="Do not repeat the product menu in the header. Do not use a full-height side for a public page with a handful of links. That page wants a top bar." header={<AppHeader />} sider={<AppSider />} siderPlacement="full-height">
                    <AppContent />
                </Frame>
            </DocSection>
            <DocSection title="Side and content">
                <FrameNote>Use this for a focused tool: a canvas, an editor, or a list that is the whole job.</FrameNote>
                <Frame name="Side and content" when="The side is the structure of the work, such as files, layers, or sections of the tool. There is no second navigation and no footer." avoid="Do not add a header only to repeat the page title. Do not use this frame for a public site that needs a brand bar and legal links." sider={<ToolSider />}>
                    <ToolCanvas />
                </Frame>
            </DocSection>
        </DocPage>
    ),
};
