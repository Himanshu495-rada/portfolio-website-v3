//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { TabProvider } from "./context/TabContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <TabProvider>
      <App />
    </TabProvider>
  </ThemeProvider>
);
