import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@": path.resolve(root, "./src"),
        },
    },
    plugins: [tailwindcss(), tanstackStart(), react()],
});
