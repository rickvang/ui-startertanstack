export const areaKinds = ["workspace", "client", "project"] as const;

export type AreaKind = (typeof areaKinds)[number];

export type Area = {
    id: string;
    kind: AreaKind;
    label: string;
};

/** Workspaces, clients, and projects this app can hold. Empty until one is added. */
export const areas: readonly Area[] = [];

export function isAreaKind(value: string): value is AreaKind {
    return areaKinds.some((kind) => kind === value);
}

export function areaPath(area: Pick<Area, "kind" | "id">): string {
    return `/${area.kind}/${area.id}`;
}

export function findArea(kind: AreaKind, id: string, list: readonly Area[] = areas): Area | undefined {
    return list.find((area) => area.kind === kind && area.id === id);
}

export function matchAreaPath(pathname: string): Pick<Area, "kind" | "id"> | null {
    const segments = pathname.split("/").filter((segment) => segment.length > 0);
    if (segments.length !== 2) {
        return null;
    }

    const [kind, id] = segments;
    if (kind === undefined || id === undefined || !isAreaKind(kind)) {
        return null;
    }

    return { kind, id };
}
