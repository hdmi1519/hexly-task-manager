/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  },
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#ffffff",
          "bg-secondary": "#f3f4f6",
          "bg-tertiary": "#e5e7eb",
          text: "#111827",
          "text-secondary": "#6b7280",
          border: "#d1d5db",
          primary: "#3b82f6",
          "primary-hover": "#2563eb",
          danger: "#ef4444",
          "danger-hover": "#dc2626",
          success: "#10b981",
          warning: "#f59e0b",
          "tag-bg": "#e0e7ff",
          "tag-text": "#4338ca",
        },
        dark: {
          bg: "#111827",
          "bg-secondary": "#1f2937",
          "bg-tertiary": "#374151",
          text: "#f9fafb",
          "text-secondary": "#9ca3af",
          border: "#4b5563",
          primary: "#60a5fa",
          "primary-hover": "#3b82f6",
          danger: "#f87171",
          "danger-hover": "#ef4444",
          success: "#34d399",
          warning: "#fbbf24",
          "tag-bg": "#312e81",
          "tag-text": "#c7d2fe",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
