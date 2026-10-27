import { useId, useState } from "react";
import { Button } from "../base/button";
import { DetailGroup } from "../base/detail-group";
import { Fieldset } from "../base/fieldset";
import { Form, FormSubmit } from "../base/form";
import { Message } from "../base/message";
import { RadioGroup } from "../base/radio";
import { Switch } from "../base/switch";
import { TextArea } from "../base/text-area";
import { TextField } from "../base/text-field";
import { Dialog } from "../layout/dialog";
import { Tabs } from "../navigation/tabs";

export const inviteRules = ["owners", "members"] as const;

export type InviteRule = (typeof inviteRules)[number];

export type SettingsFacts = {
    name: string;
    description: string;
    invite: InviteRule;
    membersCanCreate: boolean;
};

export const settingsSections = [
    { value: "product", label: "Product" },
    { value: "access", label: "Access" },
    { value: "remove", label: "Remove" },
] as const;

export type SettingsSection = (typeof settingsSections)[number]["value"];

export type SettingsScreenProps = {
    facts: SettingsFacts;
    removed: boolean;
    onChange: (facts: SettingsFacts) => void;
    onRemove: () => void;
    section?: SettingsSection;
};

function isInviteRule(value: string): value is InviteRule {
    return value === "owners" || value === "members";
}

function inviteLabel(rule: InviteRule): string {
    switch (rule) {
        case "owners":
            return "Owners";
        case "members":
            return "Members";
        default: {
            const exhaustive: never = rule;
            return exhaustive;
        }
    }
}

function yesNo(value: boolean): string {
    return value ? "Yes" : "No";
}

function Facts({ items }: { items: readonly { label: string; value: string }[] }) {
    return (
        <dl className="flex flex-col gap-spacing-04">
            {items.map((item) => (
                <div key={item.label}>
                    <dt className="text-sm font-medium text-muted">{item.label}</dt>
                    <dd className="text-sm wrap-break-word text-ink">{item.value}</dd>
                </div>
            ))}
        </dl>
    );
}

function SaveRow({ onCancel }: { onCancel: () => void }) {
    return (
        <div className="flex gap-spacing-03">
            <FormSubmit>Save</FormSubmit>
            <Button variant="secondary" type="button" onClick={onCancel}>
                Cancel
            </Button>
        </div>
    );
}

function ProductSection({ facts, onChange }: { facts: SettingsFacts; onChange: (facts: SettingsFacts) => void }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(facts.name);
    const [description, setDescription] = useState(facts.description);
    const [error, setError] = useState<string | undefined>();
    const [saved, setSaved] = useState(false);

    function start() {
        setName(facts.name);
        setDescription(facts.description);
        setError(undefined);
        setSaved(false);
        setEditing(true);
    }

    function save() {
        const nextName = name.trim();
        if (nextName === "") {
            setError("Enter a product name.");
            return;
        }

        onChange({ ...facts, name: nextName, description: description.trim() });
        setError(undefined);
        setSaved(true);
        setEditing(false);
    }

    return (
        <div className="flex w-full flex-col items-start gap-spacing-04">
            {saved ? <Message tone="success" title="Product saved">The name and description are kept.</Message> : null}
            {editing ? (
                <Form label="Product" className="w-full" onSubmit={save}>
                    <Fieldset title="Product">
                        <TextField label="Name" value={name} error={error} onChange={(event) => setName(event.target.value)} />
                        <TextArea label="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
                    </Fieldset>
                    <SaveRow onCancel={() => setEditing(false)} />
                </Form>
            ) : (
                <>
                    <DetailGroup title="Product">
                        <Facts
                            items={[
                                { label: "Name", value: facts.name },
                                { label: "Description", value: facts.description === "" ? "None" : facts.description },
                            ]}
                        />
                    </DetailGroup>
                    <Button variant="secondary" onClick={start}>
                        Edit
                    </Button>
                </>
            )}
        </div>
    );
}

function AccessSection({ facts, onChange }: { facts: SettingsFacts; onChange: (facts: SettingsFacts) => void }) {
    const [editing, setEditing] = useState(false);
    const [invite, setInvite] = useState<InviteRule>(facts.invite);
    const [membersCanCreate, setMembersCanCreate] = useState(facts.membersCanCreate);
    const [saved, setSaved] = useState(false);

    function start() {
        setInvite(facts.invite);
        setMembersCanCreate(facts.membersCanCreate);
        setSaved(false);
        setEditing(true);
    }

    function save() {
        onChange({ ...facts, invite, membersCanCreate });
        setSaved(true);
        setEditing(false);
    }

    return (
        <div className="flex w-full flex-col items-start gap-spacing-04">
            {saved ? <Message tone="success" title="Access saved">Who can invite, and whether members can create projects, are kept.</Message> : null}
            {editing ? (
                <Form label="Access" className="w-full" onSubmit={save}>
                    <Fieldset title="Access">
                        <RadioGroup
                            label="Who can invite"
                            value={invite}
                            options={[
                                { value: "owners", label: "Owners" },
                                { value: "members", label: "Members" },
                            ]}
                            onValueChange={(value) => {
                                if (isInviteRule(value)) {
                                    setInvite(value);
                                }
                            }}
                        />
                        <Switch label="Members can create projects" checked={membersCanCreate} onCheckedChange={setMembersCanCreate} />
                    </Fieldset>
                    <SaveRow onCancel={() => setEditing(false)} />
                </Form>
            ) : (
                <>
                    <DetailGroup title="Access">
                        <Facts
                            items={[
                                { label: "Who can invite", value: inviteLabel(facts.invite) },
                                { label: "Members can create projects", value: yesNo(facts.membersCanCreate) },
                            ]}
                        />
                    </DetailGroup>
                    <Button variant="secondary" onClick={start}>
                        Edit
                    </Button>
                </>
            )}
        </div>
    );
}

function RemoveSection({ name, onRemove }: { name: string; onRemove: () => void }) {
    const [open, setOpen] = useState(false);
    const [typed, setTyped] = useState("");

    return (
        <div className="flex w-full flex-col items-start gap-spacing-04">
            <Message tone="danger" title="Remove the product">
                Removing the product deletes its projects. This cannot be undone.
            </Message>
            <Button
                variant="danger"
                onClick={() => {
                    setTyped("");
                    setOpen(true);
                }}
            >
                Remove
            </Button>
            {open ? (
                <Dialog
                    title={`Remove ${name}`}
                    confirmLabel="Remove"
                    confirmDisabled={typed.trim() !== name}
                    onCancel={() => setOpen(false)}
                    onConfirm={() => {
                        setOpen(false);
                        onRemove();
                    }}
                >
                    <p>Type {name} to remove the product.</p>
                    <TextField label="Product name" value={typed} onChange={(event) => setTyped(event.target.value)} />
                </Dialog>
            ) : null}
        </div>
    );
}

function Removed({ name }: { name: string }) {
    return <Message tone="danger" title="Product removed">{name} was removed.</Message>;
}

function SettingsPart({ section, facts, onChange, onRemove }: { section: SettingsSection; facts: SettingsFacts; onChange: (facts: SettingsFacts) => void; onRemove: () => void }) {
    switch (section) {
        case "product":
            return <ProductSection facts={facts} onChange={onChange} />;
        case "access":
            return <AccessSection facts={facts} onChange={onChange} />;
        case "remove":
            return <RemoveSection name={facts.name} onRemove={onRemove} />;
        default: {
            const exhaustive: never = section;
            return exhaustive;
        }
    }
}

export function SettingsScreen({ facts, removed, onChange, onRemove, section }: SettingsScreenProps) {
    const titleId = useId();

    if (section) {
        return (
            <div className="flex w-full min-w-0 max-w-xl flex-col gap-spacing-05">
                {removed ? <Removed name={facts.name} /> : <SettingsPart section={section} facts={facts} onChange={onChange} onRemove={onRemove} />}
            </div>
        );
    }

    return (
        <section aria-labelledby={titleId} className="flex w-full min-w-0 max-w-xl flex-col gap-spacing-05">
            <header className="flex flex-col gap-spacing-02">
                <h2 id={titleId} className="text-lg font-semibold text-ink">
                    Settings
                </h2>
                <p className="text-sm text-ink">Product settings stay out of the domain menu. They remain available on every page.</p>
            </header>
            {removed ? (
                <Removed name={facts.name} />
            ) : (
                <Tabs
                    items={[
                        { value: "product", label: "Product", content: <ProductSection facts={facts} onChange={onChange} /> },
                        { value: "access", label: "Access", content: <AccessSection facts={facts} onChange={onChange} /> },
                        { value: "remove", label: "Remove", content: <RemoveSection name={facts.name} onRemove={onRemove} /> },
                    ]}
                />
            )}
        </section>
    );
}
