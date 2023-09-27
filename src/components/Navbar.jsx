import { useContext } from "react";
import { snippetContext } from "../contexts/SnippetContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const history = useNavigate();

  const notify = (msg) => toast(msg);
  const { editor } = useContext(snippetContext);
  const [snippet, setSnippet] = editor;

  const sendDeleteSnippetRequest = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets" + "/snippet_id", {
      method: "DELETE",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        setSnippet({ title: "", content: "" });
        history("/");
        notify("Snippet deleted");
      } else {
        notify("Something went wrong");
      }
    });
  };
  const sendUpdateSnippetRequest = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets" + "/snippet_id", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
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
      }),
    })
      .then((httpResponse) => httpResponse.json())
      .then((newlyCreatedSnippet) => {
        setSnippet(newlyCreatedSnippet);
        history("/" + newlyCreatedSnippet.shortId);
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
        className="fixed z-50 top-5 right-5 flex gap-4 rounded-lg bg-purple-100 p-2"
      >
        {snippet.createdAt && (
          <p>{new Date(snippet.createdAt).toLocaleDateString()}</p>
        )}
        <input
          className="rounded-lg"
          value={snippet.title}
          onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
        ></input>
        <select className="rounded-lg">
          <option value="language">please choose</option>
          <option value="javascript">Javascript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="sql">SQL</option>
        </select>
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
