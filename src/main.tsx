import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { seedSession } from "./session";
import "./styles.css";

seedSession();

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
