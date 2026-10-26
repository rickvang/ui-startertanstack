import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Avatar } from "../base/avatar";
import { Button } from "../base/button";

export const shellDomains = ["projects", "members", "billing"] as const;

export type ShellDomain = (typeof shellDomains)[number];

type OpenPanel = "help" | "account";

export function shellDomainHelp(domain: ShellDomain): { title: string; body: string } {
    switch (domain) {
        case "projects":
            return {
                title: "Projects",
                body: "Projects are the open work in this organization. Invite the people who work on one.",
            };
        case "members":
            return {
                title: "Members",
                body: "Members are the people in this organization. An accepted invite shows up here.",
            };
        case "billing":
            return {
                title: "Billing",
                body: "Billing is this organization's plan. It is separate from the person's account.",
            };
        default: {
            const exhaustive: never = domain;
            return exhaustive;
        }
    }
}

const accountBody = "This account belongs to the person. It stays when the domain or the organization changes.";

function Note({ kicker, title, body }: { kicker: string; title: string; body: string }) {
    return (
        <div className="rounded-md border border-line bg-canvas px-spacing-04 py-spacing-03">
            <p className="text-xs text-muted">{kicker}</p>
            <p className="font-medium text-ink">{title}</p>
            <p className="text-sm text-ink">{body}</p>
        </div>
    );
}

export function ShellBar({
    title,
    helpTitle,
    helpBody,
    name,
    onAccount,
    accountCurrent = false,
}: {
    title: ReactNode;
    helpTitle: string;
    helpBody: string;
    name: string;
    onAccount?: () => void;
    accountCurrent?: boolean;
}) {
    const [open, setOpen] = useState<OpenPanel | null>(null);
    const helpRef = useRef<HTMLButtonElement>(null);
    const accountRef = useRef<HTMLButtonElement>(null);

    function toggle(panel: OpenPanel) {
        setOpen((current) => (current === panel ? null : panel));
    }

    function close(event: KeyboardEvent) {
        if (event.key !== "Escape" || open === null) {
            return;
        }
        event.stopPropagation();
        const panel = open;
        setOpen(null);
        const target = panel === "account" ? accountRef.current : helpRef.current;
        target?.focus();
    }

    function openAccount() {
        if (onAccount) {
            setOpen((current) => (current === "help" ? null : current));
            onAccount();
            return;
        }
        toggle("account");
    }

    return (
        <div className="flex w-full min-w-0 flex-col gap-spacing-03" onKeyDown={close}>
            <div className="flex items-center gap-spacing-03">
                <div className="min-w-0 font-medium text-ink">{title}</div>
                <div className="ml-auto flex items-center gap-spacing-03">
                    <Button ref={helpRef} variant="ghost" aria-expanded={open === "help"} onClick={() => toggle("help")}>
                        Help
                    </Button>
                    <button
                        ref={accountRef}
                        type="button"
                        className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-spacing-01 focus-visible:outline-focus"
                        aria-expanded={onAccount ? undefined : open === "account"}
                        aria-current={accountCurrent ? "page" : undefined}
                        aria-label={`${name}, account`}
                        onClick={openAccount}
                    >
                        <Avatar name={name} />
                    </button>
                </div>
            </div>
            {open === "help" ? <Note kicker="Help" title={helpTitle} body={helpBody} /> : null}
            {open === "account" && !onAccount ? <Note kicker="Account" title={name} body={accountBody} /> : null}
        </div>
    );
}
