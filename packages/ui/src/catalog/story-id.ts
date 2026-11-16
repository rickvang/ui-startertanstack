/** Storybook CSF id segment: camelCase → dashes, lowercase, non-alphanumeric → `-`. */
export function storybookSegment(value: string): string {
    return value
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/** Storybook story id from CSF `title` + story name/export. */
export function storybookStoryId(title: string, storyName: string): string {
    const titleId = title
        .split("/")
        .map((part) => storybookSegment(part))
        .filter(Boolean)
        .join("-");
    return `${titleId}--${storybookSegment(storyName)}`;
}

export function catalogSlug(value: string): string {
    return storybookSegment(value);
}
