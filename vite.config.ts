import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Tailwind
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/hexly-task-manager/",
});
