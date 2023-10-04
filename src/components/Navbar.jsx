import { useContext } from "react";
import { SnippetContext } from "../contexts/SnippetContext";
import { toast } from "react-toastify";
import { AVAILABLE_LANGUAGES } from "../enums/editor";
import { ApplicationSettingsContext } from "../contexts/ApplicationSettingsContext";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const history = (path) => window.history.pushState({}, "", path);
  const notify = (msg) => toast(msg);
  const {
    editor,
    unsavedState,
    sendCreateSnippetRequest,
    sendDeleteSnippetRequest,
    sendUpdateSnippetRequest,
    resetFields,
  } = useContext(SnippetContext);
  const { darkMode, toggleDarkMode } = useContext(ApplicationSettingsContext);
  const [snippet, setSnippet] = editor;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    notify("Copied to clipboard");
  };

  const handleSwitchToNewSnippet = () => {
    if (unsavedState) {
      const result = window.confirm("You have unsaved changes. Continue?");
      if (!result) {
        return;
      }
    }
    resetFields();
  };
  return (
    <>
      <div
        id="navbar"
        className={`fixed z-50 top-1 right-5 flex gap-4 rounded-lg ${
          darkMode ? `bg-blue-200` : `bg-blue-800 text-white`
        }  p-2`}
      >
        <span className=" text-red-500">
          {unsavedState && (
            <span>
              You have unsaved changes.{" "}
              {snippet.updatedAt && (
                <span>
                  (last saved at{" "}
                  {new Date(snippet.updatedAt).toLocaleDateString()})
                </span>
              )}{" "}
            </span>
          )}
        </span>
        {snippet.createdAt && (
          <p>{new Date(snippet.createdAt).toLocaleDateString()}</p>
        )}
        <input
          className="rounded-lg text-black"
          value={snippet.title}
          onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
        ></input>

        <select
          className="rounded-lg text-black"
          value={snippet.language}
          onChange={(e) => setSnippet({ ...snippet, language: e.target.value })}
        >
          {Object.keys(AVAILABLE_LANGUAGES).map((language) => (
            <option key={language} value={AVAILABLE_LANGUAGES[language]}>
              {language}
            </option>
          ))}
        </select>
        <button onClick={toggleDarkMode}>TOGGLE THEME</button>
        {snippet.shortId ? (
          <button onClick={sendUpdateSnippetRequest}>SAVE CHANGES</button>
        ) : (
          <button onClick={sendCreateSnippetRequest}>CREATE SNIPPET</button>
        )}
        {snippet.shortId && <button onClick={copyLink}>COPY LINK</button>}
        {snippet.shortId && (
          <button onClick={sendDeleteSnippetRequest}>DELETE</button>
        )}
        {snippet.shortId && (
          <button onClick={handleSwitchToNewSnippet}>CREATE NEW SNIPPET</button>
        )}
      </div>
    </>
  );
}
