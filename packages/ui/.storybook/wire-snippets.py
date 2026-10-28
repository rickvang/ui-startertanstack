#!/usr/bin/env python3
"""One-off wiring for copyable story snippets. Idempotent on re-run for listed files."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "src"

AUTODOCS_IMPORT = (
    'import { autodocsComponentParameters, autodocsTags } from "../../../.storybook/copyable-snippets";\n'
    'import { docsFromSnippet'
)

# (relative path from src, snippet import name, first story export name)
AUTODOCS = [
    ("components/base/avatar.stories.tsx", "avatarSnippet", "Default"),
    ("components/base/badge.stories.tsx", "badgeSnippet", "Success"),
    ("components/base/checkbox.stories.tsx", "checkboxSnippet", "Default"),
    ("components/base/description-list.stories.tsx", "descriptionListSnippet", "Stacked"),
    ("components/base/field.stories.tsx", "fieldSnippet", "Hint"),
    ("components/base/loader.stories.tsx", "loaderSnippet", "Loading"),
    ("components/base/radio.stories.tsx", "radioSnippet", "Stacked"),
    ("components/base/select.stories.tsx", "selectSnippet", "Stacked"),
    ("components/base/switch.stories.tsx", "switchSnippet", "Default"),
    ("components/base/text-area.stories.tsx", "textAreaSnippet", "Stacked"),
    ("components/base/text-field.stories.tsx", "textFieldSnippet", "Stacked"),
    ("components/navigation/anchor.stories.tsx", "anchorSnippet", "Default"),
    ("components/navigation/breadcrumb.stories.tsx", "breadcrumbSnippet", "Default"),
    ("components/navigation/dropdown.stories.tsx", "dropdownSnippet", "Default"),
    ("components/navigation/menu.stories.tsx", "menuSnippet", "Default"),
    ("components/navigation/pagination.stories.tsx", "paginationSnippet", "Default"),
    ("components/navigation/steps.stories.tsx", "stepsSnippet", "Default"),
    ("components/navigation/tabs.stories.tsx", "tabsSnippet", "Default"),
    ("components/layout/divider.stories.tsx", "dividerSnippet", "Default"),
    ("components/layout/flex.stories.tsx", "flexSnippet", "Row"),
    ("components/layout/grid.stories.tsx", "gridSnippet", "ThreeColumns"),
    ("components/layout/masonry.stories.tsx", "masonrySnippet", "TwoColumns"),
    ("components/layout/space.stories.tsx", "spaceSnippet", "Inline"),
    ("components/layout/splitter.stories.tsx", "splitterSnippet", "TwoPanes"),
    ("components/layout/stack.stories.tsx", "stackSnippet", "Vertical"),
]

def depth_import(path: str) -> str:
    parts = Path(path).parts
    ups = len(parts) - 1
    return "../" * ups + ".storybook/copyable-snippets"


def wire_autodocs(rel: str, snippet: str, story: str) -> None:
    path = ROOT / rel
    text = path.read_text()
    if "docsFromSnippet" in text:
        return

    ups = len(Path(rel).parts) - 1
    prefix = "../" * ups
    snippet_import = (
        f'import {{ autodocsComponentParameters, autodocsTags }} from "{prefix}.storybook/copyable-snippets";\n'
        f'import {{ docsFromSnippet, {snippet} }} from "{prefix}.storybook/story-snippets";\n'
    )
    text = re.sub(
        r"(import type \{ Meta, StoryObj \} from \"@storybook/react-vite\";\n)",
        r"\1" + snippet_import,
        text,
        count=1,
    )

    if "tags:" not in text:
        text = re.sub(
            r"(const meta = \{)",
            r'\1\n    tags: ["autodocs"],\n    parameters: autodocsComponentParameters,',
            text,
            count=1,
        )

    story_empty = rf"export const {story}: Story = \{{\s*\}};"
    if re.search(story_empty, text):
        text = re.sub(
            story_empty,
            f"export const {story}: Story = {{\n    ...docsFromSnippet({snippet}),\n}};",
            text,
            count=1,
        )
    else:
        text = re.sub(
            rf"(export const {story}: Story = \{{\n)",
            rf"\1    ...docsFromSnippet({snippet}),\n",
            text,
            count=1,
        )
    path.write_text(text)


def main() -> None:
    for rel, snippet, story in AUTODOCS:
        wire_autodocs(rel, snippet, story)
    print(f"Wired {len(AUTODOCS)} autodocs files")


if __name__ == "__main__":
    main()
