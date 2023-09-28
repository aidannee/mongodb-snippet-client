import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnippetProvider } from "./contexts/SnippetContext.jsx";
import { ApplicationSettingsProvider } from "./contexts/ApplicationSettingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnippetProvider>
    <ApplicationSettingsProvider>
      <App />
    </ApplicationSettingsProvider>
  </SnippetProvider>
);
