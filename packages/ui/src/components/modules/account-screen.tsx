import { useId, useState } from "react";
import { Avatar } from "../base/avatar";
import { Button } from "../base/button";
import { DetailGroup } from "../base/detail-group";
import { Fieldset } from "../base/fieldset";
import { Form, FormSubmit } from "../base/form";
import { Message } from "../base/message";
import { Select } from "../base/select";
import { Switch } from "../base/switch";
import { TextField } from "../base/text-field";
import { Dialog } from "../layout/dialog";
import { Tabs } from "../navigation/tabs";

export const accountLanguages = ["english", "spanish"] as const;

export type AccountLanguage = (typeof accountLanguages)[number];

export type AccountFacts = {
    name: string;
    email: string;
    emailNotices: boolean;
    language: AccountLanguage;
};

export type AccountScreenProps = {
    facts: AccountFacts;
    removed: boolean;
    onChange: (facts: AccountFacts) => void;
    onRemove: () => void;
};

function isLanguage(value: string): value is AccountLanguage {
    return value === "english" || value === "spanish";
}

function languageLabel(language: AccountLanguage): string {
    switch (language) {
        case "english":
            return "English";
        case "spanish":
            return "Spanish";
        default: {
            const exhaustive: never = language;
            return exhaustive;
        }
    }
}

function yesNo(value: boolean): string {
    return value ? "On" : "Off";
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

function ProfileSection({ facts, onChange }: { facts: AccountFacts; onChange: (facts: AccountFacts) => void }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(facts.name);
    const [email, setEmail] = useState(facts.email);
    const [nameError, setNameError] = useState<string | undefined>();
    const [emailError, setEmailError] = useState<string | undefined>();
    const [saved, setSaved] = useState(false);

    function start() {
        setName(facts.name);
        setEmail(facts.email);
        setNameError(undefined);
        setEmailError(undefined);
        setSaved(false);
        setEditing(true);
    }

    function save() {
        const nextName = name.trim();
        const nextEmail = email.trim();
        const missingName = nextName === "";
        const missingEmail = nextEmail === "";
        setNameError(missingName ? "Enter a name." : undefined);
        setEmailError(missingEmail ? "Enter an email." : undefined);
        if (missingName || missingEmail) {
            return;
        }

        onChange({ ...facts, name: nextName, email: nextEmail });
        setSaved(true);
        setEditing(false);
    }

    return (
        <div className="flex w-full flex-col items-start gap-spacing-04">
            {saved ? <Message tone="success" title="Profile saved">The name and email are kept. The picture uses the initials.</Message> : null}
            {editing ? (
                <Form label="Profile" className="w-full" onSubmit={save}>
                    <Fieldset title="Profile">
                        <TextField label="Name" value={name} error={nameError} onChange={(event) => setName(event.target.value)} />
                        <TextField label="Email" type="email" value={email} error={emailError} onChange={(event) => setEmail(event.target.value)} />
                    </Fieldset>
                    <SaveRow onCancel={() => setEditing(false)} />
                </Form>
            ) : (
                <>
                    <DetailGroup title="Profile">
                        <div className="flex items-center gap-spacing-03">
                            <Avatar name={facts.name} />
                            <Facts
                                items={[
                                    { label: "Name", value: facts.name },
                                    { label: "Email", value: facts.email },
                                ]}
                            />
                        </div>
                    </DetailGroup>
                    <Button variant="secondary" onClick={start}>
                        Edit
                    </Button>
                </>
            )}
        </div>
    );
}

function SignInSection() {
    const [editing, setEditing] = useState(false);
    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [currentError, setCurrentError] = useState<string | undefined>();
    const [nextError, setNextError] = useState<string | undefined>();
    const [saved, setSaved] = useState(false);

    function start() {
        setCurrent("");
        setNext("");
        setCurrentError(undefined);
        setNextError(undefined);
        setSaved(false);
        setEditing(true);
    }

    function save() {
        const currentValue = current.trim();
        const nextValue = next.trim();
        const missingCurrent = currentValue === "";
        const samePassword = !missingCurrent && nextValue !== "" && nextValue === currentValue;
        const missingNext = nextValue === "";
        setCurrentError(missingCurrent ? "Enter the current password." : undefined);
        setNextError(missingNext ? "Enter a new password." : samePassword ? "Choose a different password." : undefined);
        if (missingCurrent || missingNext || samePassword) {
            return;
        }

        setSaved(true);
        setEditing(false);
    }

    return (
        <div className="flex w-full flex-col items-start gap-spacing-04">
            {saved ? <Message tone="success" title="Password saved">The new password is set.</Message> : null}
            {editing ? (
                <Form label="Sign-in" className="w-full" onSubmit={save}>
                    <Fieldset title="Sign-in">
                        <TextField label="Current password" type="password" value={current} error={currentError} autoComplete="current-password" onChange={(event) => setCurrent(event.target.value)} />
                        <TextField label="New password" type="password" value={next} error={nextError} autoComplete="new-password" onChange={(event) => setNext(event.target.value)} />
                    </Fieldset>
                    <SaveRow onCancel={() => setEditing(false)} />
                </Form>
            ) : (
                <>
                    <DetailGroup title="Sign-in">
                        <Facts items={[{ label: "Password", value: "A password is set." }]} />
                    </DetailGroup>
                    <Button variant="secondary" onClick={start}>
                        Edit
                    </Button>
                </>
            )}
        </div>
    );
}

function NoticesSection({ facts, onChange }: { facts: AccountFacts; onChange: (facts: AccountFacts) => void }) {
    const [editing, setEditing] = useState(false);
    const [emailNotices, setEmailNotices] = useState(facts.emailNotices);
    const [language, setLanguage] = useState<AccountLanguage>(facts.language);
    const [saved, setSaved] = useState(false);

    function start() {
        setEmailNotices(facts.emailNotices);
        setLanguage(facts.language);
        setSaved(false);
        setEditing(true);
    }

    function save() {
        onChange({ ...facts, emailNotices, language });
        setSaved(true);
        setEditing(false);
    }

    return (
        <div className="flex w-full flex-col items-start gap-spacing-04">
            {saved ? <Message tone="success" title="Notices saved">Email notices and language stay with the person.</Message> : null}
            {editing ? (
                <Form label="Notices" className="w-full" onSubmit={save}>
                    <Fieldset title="Notices">
                        <Switch label="Email notices" checked={emailNotices} onCheckedChange={setEmailNotices} />
                        <Select
                            label="Language"
                            value={language}
                            options={[
                                { value: "english", label: "English" },
                                { value: "spanish", label: "Spanish" },
                            ]}
                            onChange={(event) => {
                                if (isLanguage(event.target.value)) {
                                    setLanguage(event.target.value);
                                }
                            }}
                        />
                    </Fieldset>
                    <SaveRow onCancel={() => setEditing(false)} />
                </Form>
            ) : (
                <>
                    <DetailGroup title="Notices">
                        <Facts
                            items={[
                                { label: "Email notices", value: yesNo(facts.emailNotices) },
                                { label: "Language", value: languageLabel(facts.language) },
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
            <Message tone="danger" title="Remove the account">
                Removing the account signs the person out. This cannot be undone.
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
            <Dialog
                open={open}
                title={`Remove ${name}`}
                confirmLabel="Remove"
                confirmDisabled={typed.trim() !== name}
                onCancel={() => setOpen(false)}
                onConfirm={() => {
                    setOpen(false);
                    onRemove();
                }}
            >
                <p>Type {name} to remove the account.</p>
                <TextField label="Name" value={typed} onChange={(event) => setTyped(event.target.value)} />
            </Dialog>
        </div>
    );
}

export function AccountScreen({ facts, removed, onChange, onRemove }: AccountScreenProps) {
    const titleId = useId();

    return (
        <section aria-labelledby={titleId} className="flex w-full min-w-0 max-w-xl flex-col gap-spacing-05">
            <header className="flex flex-col gap-spacing-02">
                <h2 id={titleId} className="text-lg font-semibold text-ink">
                    Account
                </h2>
                <p className="text-sm text-ink">This account belongs to the person. It stays when the domain or the organization changes.</p>
            </header>
            {removed ? (
                <Message tone="danger" title="Account removed">
                    {facts.name} was removed.
                </Message>
            ) : (
                <Tabs
                    items={[
                        { value: "profile", label: "Profile", content: <ProfileSection facts={facts} onChange={onChange} /> },
                        { value: "sign-in", label: "Sign-in", content: <SignInSection /> },
                        { value: "notices", label: "Notices", content: <NoticesSection facts={facts} onChange={onChange} /> },
                        { value: "remove", label: "Remove", content: <RemoveSection name={facts.name} onRemove={onRemove} /> },
                    ]}
                />
            )}
        </section>
    );
}
