import { createRoot } from "react-dom/client";
import { App } from "./App";

const app = document.getElementById("app");
const root = createRoot(app); // createRoot(container!) if you use TypeScript
root.render(<App />);
