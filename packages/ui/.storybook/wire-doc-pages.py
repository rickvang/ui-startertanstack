#!/usr/bin/env python3
"""Wire DocCodeSection into DocPage-based stories."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "src"

# rel path, story export name, snippet export, note expression
DOC_PAGES = [
    ("components/base/detail-group.stories.tsx", "DetailGroupStory", "detailGroupSnippet", "libraryExportNote"),
    ("components/base/fieldset.stories.tsx", "FieldsetStory", "fieldsetSnippet", "libraryExportNote"),
    ("components/base/fieldset.stories.tsx", "FieldsetDensities", "fieldsetSnippet", "libraryExportNote"),
    ("components/base/fieldset.stories.tsx", "FieldsetError", "fieldsetSnippet", "libraryExportNote"),
    ("components/base/form.stories.tsx", "FormSummary", "formSummarySnippet", "libraryExportNote"),
    ("components/base/form.stories.tsx", "FormPending", "formPendingSnippet", "libraryExportNote"),
    ("components/modules/detail-card.stories.tsx", "Detail", "detailCardSnippet", "libraryExportNote"),
    ("components/modules/form-group.stories.tsx", "Forms", "formGroupModuleSnippet", "libraryExportNote"),
    ("components/modules/settings-screen.stories.tsx", "Settings", "settingsScreenSnippet", "libraryExportNote"),
    ("components/modules/shell.stories.tsx", "Shell", "shellSnippet", "libraryExportNote"),
    ("components/modules/account-screen.stories.tsx", "Account", "accountScreenSnippet", "libraryExportNote"),
    ("components/modules/table/stories/members.stories.tsx", "Members", "membersTableSnippet", "libraryExportNote"),
    ("components/modules/table/stories/find.stories.tsx", "Find", "tableFindSnippet", "libraryExportNote"),
    ("components/modules/table/stories/expand.stories.tsx", "Expand", "tableExpandSnippet", "libraryExportNote"),
    ("components/modules/table/stories/select-and-act.stories.tsx", "SelectAndAct", "tableSelectActSnippet", "libraryExportNote"),
    ("components/modules/table/stories/states.stories.tsx", "States", "tableStatesSnippet", "libraryExportNote"),
    ("components/modules/table/stories/long-list.stories.tsx", "LongList", "tableLongListSnippet", "libraryExportNote"),
    ("components/modules/table/stories/wide-and-sticky.stories.tsx", "WideAndSticky", "tableWideStickySnippet", "libraryExportNote"),
    ("components/templates/overlay.stories.tsx", "Modal", "modalCompositionSnippet", "compositionNote"),
    ("components/templates/overlay.stories.tsx", "SlideIn", "slideInCompositionSnippet", "compositionNote"),
    ("components/layout/layout.stories.tsx", "Standard", "layoutSnippet", "libraryExportNote"),
    ("components/templates/overview.stories.tsx", "Overview", "templatesOverviewSnippet", "libraryExportNote"),
    ("components/templates/global-rules.stories.tsx", "MessageAndFeedback", "globalRulesMessageSnippet", "libraryExportNote"),
    ("components/templates/global-rules.stories.tsx", "EmptyStatus", "globalRulesEmptySnippet", "libraryExportNote"),
    ("components/patterns/account-information.stories.tsx", "AccountInformation", "accountInformationSnippet", "compositionNote"),
    ("components/patterns/inline-edit.stories.tsx", "InlineEdit", "inlineEditSnippet", "compositionNote"),
    ("components/patterns/modifying-record.stories.tsx", "ModifyingRecord", "modifyingRecordSnippet", "compositionNote"),
    ("components/patterns/navigating-domains.stories.tsx", "NavigatingDomains", "navigatingDomainsSnippet", "compositionNote"),
    ("components/patterns/onboarding.stories.tsx", "Onboarding", "onboardingSnippet", "compositionNote"),
    ("components/patterns/product-settings.stories.tsx", "ProductSettings", "productSettingsSnippet", "compositionNote"),
    ("components/patterns/switching-organizations.stories.tsx", "SwitchingOrganizations", "switchingOrganizationsSnippet", "compositionNote"),
    ("components/patterns/task-management.stories.tsx", "TaskManagement", "taskManagementSnippet", "compositionNote"),
    ("components/patterns/visualization-page.stories.tsx", "VisualizationPage", "visualizationPageSnippet", "compositionNote"),
    ("components/patterns/wizard.stories.tsx", "Wizard", "wizardSnippet", "compositionNote"),
]

INLINE_CODE = [
    ("components/base/message.stories.tsx", "MessageStory", "messageSnippet", "libraryExportNote"),
    ("components/layout/dialog.stories.tsx", "DialogStory", "dialogSnippet", "libraryExportNote"),
]


def storybook_prefix(rel: str) -> str:
    ups = len(Path(rel).parent.parts) + 1
    return "../" * ups


def ensure_doc_imports(text: str, prefix: str, snippets: set[str]) -> str:
    if "DocCodeSection" in text and "story-snippets" in text:
        return text

    snippet_list = ", ".join(sorted(snippets))
    note_import = ""
    if "libraryExportNote" in snippets or any(
        x in text for x in ("libraryExportNote", "compositionNote")
    ):
        note_import = f'{prefix}.storybook/story-snippets", '
    block = (
        f'import {{ {snippet_list}, libraryExportNote, compositionNote }} from "{prefix}.storybook/story-snippets";\n'
        if "compositionNote" in str(snippets)
        else f'import {{ {snippet_list}, libraryExportNote }} from "{prefix}.storybook/story-snippets";\n'
    )
    # simplify imports
    needs_composition = "compositionNote" in str(snippets)
    if needs_composition:
        imp = f'import {{ {snippet_list}, compositionNote, libraryExportNote }} from "{prefix}.storybook/story-snippets";\n'
    else:
        imp = f'import {{ {snippet_list}, libraryExportNote }} from "{prefix}.storybook/story-snippets";\n'

    if "DocCodeSection" not in text:
        text = re.sub(
            r"(from \"\.\./.*templates/doc\";\n)",
            lambda m: m.group(1).replace(
                "DocPage",
                "DocCodeSection, DocPage",
            )
            if "DocCodeSection" not in m.group(1)
            else m.group(1),
            text,
            count=1,
        )
        if "DocCodeSection" not in text:
            text = re.sub(
                r"(import type \{ Meta, StoryObj \} from \"@storybook/react-vite\";\n)",
                r"\1import { DocCodeSection } from \"../templates/doc\";\n" if "components/base/message" in prefix else r"\1",
                text,
            )

    if "story-snippets" not in text:
        text = re.sub(
            r"(import type \{ Meta, StoryObj \} from \"@storybook/react-vite\";\n)",
            r"\1" + imp,
            text,
            count=1,
        )
    return text


def insert_doc_section(text: str, story: str, snippet: str, note: str) -> str:
    marker = f'<DocCodeSection note={{{note}}} code={{{snippet}}} />'
    if marker in text:
        return text

    # After DocPage opening tag (first line with intro=)
    pattern = rf"(export const {story}: Story = \{{[\s\S]*?<DocPage[^>]*>\n)"
    match = re.search(pattern, text)
    if not match:
        return text
    insert = match.group(1) + f"            {marker}\n"
    return text.replace(match.group(1), insert, 1)


def insert_inline_section(text: str, story: str, snippet: str, note: str) -> str:
    marker = f'<DocCodeSection note={{{note}}} code={{{snippet}}} />'
    if marker in text:
        return text

    pattern = rf"(export const {story}: Story = \{{[\s\S]*?render: \(\) => \(\n\s+<div className="
    match = re.search(pattern, text)
    if match:
        return re.sub(
            rf"(export const {story}: Story = \{{[\s\S]*?render: \(\) => \(\n)",
            rf"\1            {marker}\n",
            text,
            count=1,
        )

    pattern = rf"(export const {story}: Story = \{{[\s\S]*?render: \(\) => \(\n\s+<div className=\"flex flex-col"
    match = re.search(pattern, text)
    if match:
        return re.sub(
            rf"(export const {story}: Story = \{{[\s\S]*?render: \(\) => \(\n)",
            rf"\1                {marker}\n",
            text,
            count=1,
        )
    return text


def main() -> None:
    by_file: dict[str, list[tuple[str, str, str]]] = {}
    for rel, story, snippet, note in DOC_PAGES:
        by_file.setdefault(rel, []).append((story, snippet, note))
    for rel, story, snippet, note in INLINE_CODE:
        by_file.setdefault(rel, []).append((story, snippet, note))

    for rel, entries in by_file.items():
        path = ROOT / rel
        text = path.read_text()
        prefix = storybook_prefix(rel)
        snippets = {e[1] for e in entries}
        notes = {e[2] for e in entries}
        if "membersTableSnippet" in snippets:
            snippets.add("membersTableSnippet")
        text = ensure_doc_imports(text, prefix, snippets | notes)

        if "DocCodeSection" not in text and "templates/doc" in text:
            text = text.replace(
                "DocPage, DocSection",
                "DocCodeSection, DocPage, DocSection",
            ).replace(
                "DocDemo, DocPage",
                "DocCodeSection, DocDemo, DocPage",
            ).replace(
                "DocList, DocPage",
                "DocCodeSection, DocList, DocPage",
            )

        for story, snippet, note in entries:
            if rel in [x[0] for x in INLINE_CODE]:
                text = insert_inline_section(text, story, snippet, note)
            else:
                text = insert_doc_section(text, story, snippet, note)

        path.write_text(text)
        print("updated", rel)


if __name__ == "__main__":
    main()
