import { useEffect, useState } from "react";
import { Button, TextField } from "@ui-starter/ui";

export function App() {
    const [dark, setDark] = useState(false);
    const [name, setName] = useState("ui-starter");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return (
        <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-spacing-07 px-spacing-06 py-spacing-10">
            <header className="flex flex-col gap-spacing-03">
                <p className="text-sm font-medium text-muted">packages/ui · TanStack Start</p>
                <h1 className="text-display-sm font-semibold">Build on your own components.</h1>
                <p className="text-md text-muted">
                    Tokens and controls live in the UI package. This app owns the file routes in src/routes, the theme toggle, and the page you add next.
                </p>
            </header>

            <form
                className="flex flex-col gap-spacing-05 rounded-md border border-line bg-surface p-spacing-05.5"
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <TextField label="Project name" value={name} hint="Stored only in this page for now." onChange={(event) => setName(event.target.value)} />
                <div className="flex flex-wrap gap-spacing-03">
                    <Button type="submit">Save</Button>
                    <Button variant="secondary" onClick={() => setName("ui-starter")}>
                        Reset
                    </Button>
                    <Button variant="ghost" onClick={() => setDark((value) => !value)}>
                        {dark ? "Light theme" : "Dark theme"}
                    </Button>
                </div>
            </form>
        </main>
    );
}
