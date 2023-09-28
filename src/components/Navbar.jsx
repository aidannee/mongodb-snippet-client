import { useContext } from "react";
import { SnippetContext } from "../contexts/SnippetContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AVAILABLE_LANGUAGES } from "../enums/editor";
import { ApplicationSettingsContext } from "../contexts/ApplicationSettingsContext";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const history = useNavigate();

  const notify = (msg) => toast(msg);
  const { editor } = useContext(SnippetContext);
  const { darkMode, toggleDarkMode } = useContext(ApplicationSettingsContext);
  const [snippet, setSnippet] = editor;

  const sendDeleteSnippetRequest = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet.shortId, {
      method: "DELETE",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        setSnippet({
          title: "",
          content: "",
          language: AVAILABLE_LANGUAGES.javascript,
        });
        history("/");
        notify("Snippet deleted");
      } else {
        notify("Something went wrong");
      }
    });
  };
  const sendUpdateSnippetRequest = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet.shortId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
        language: snippet.language,
      }),
    })
      .then((httpResponse) => {
        if (httpResponse.ok) {
          notify("Snippet updated");
        } else {
          notify("Changes not saved");
        }
        return httpResponse.json();
      })
      .then((updatedSnippet) => {
        setSnippet(updatedSnippet);
      });
  };
  const sendCreateSnippetRequest = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
        language: snippet.language,
      }),
    })
      .then((httpResponse) => httpResponse.json())
      .then((newlyCreatedSnippet) => {
        setSnippet(newlyCreatedSnippet);
        history("/" + newlyCreatedSnippet.snippet.shortId);
        notify("Snippet created");
      });
  };
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    notify("Copied to clipboard");
  };
  return (
    <>
      <div
        id="navbar"
        className={`fixed z-50 top-5 right-5 flex gap-4 rounded-lg bg-purple-100 p-2`}
      >
        {snippet.createdAt && (
          <p>{new Date(snippet.createdAt).toLocaleDateString()}</p>
        )}
        <input
          className="rounded-lg"
          value={snippet.title}
          onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
        ></input>

        <select
          className="rounded-lg"
          value={snippet.language}
          onChange={(e) => setSnippet({ ...snippet, language: e.target.value })}
        >
          {Object.keys(AVAILABLE_LANGUAGES).map((language) => (
            <option key={language} value={AVAILABLE_LANGUAGES[language]}>
              {language}
            </option>
          ))}
        </select>
        <button onClick={toggleDarkMode}>toggle theme</button>
        {snippet.shortId ? (
          <button onClick={sendUpdateSnippetRequest}>SAVE CHANGES</button>
        ) : (
          <button onClick={sendCreateSnippetRequest}>CREATE SNIPPET</button>
        )}
        {snippet.shortId && <button onClick={copyLink}>COPY LINK</button>}
        {snippet.shortId && (
          <button onClick={sendDeleteSnippetRequest}>DELETE</button>
        )}
      </div>
    </>
  );
}
