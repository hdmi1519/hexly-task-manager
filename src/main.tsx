import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

// Styles
import "./styles/root.css";

createRoot(document.getElementById("root")!).render(<App />);
