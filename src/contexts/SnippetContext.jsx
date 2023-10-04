import { createContext, useEffect, useState } from "react";
import { AVAILABLE_LANGUAGES } from "../enums/editor";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const SnippetContext = createContext(null);
const emptySnippetState = {
  titel: "",
  content: "",
  language: AVAILABLE_LANGUAGES.plaintext,
};
export const SnippetProvider = ({ children }) => {
  // this is for the editor and nav bar
  let snippet_id = window.location.pathname.split("/")[1];
  const [snippet, setSnippet] = useState({
    title: "",
    content: "",
    language: AVAILABLE_LANGUAGES.plaintext,
  });
  const [snippetDIFF, setSnippetDIFF] = useState({
    title: "",
    content: "",
    language: AVAILABLE_LANGUAGES.plaintext,
  });
  const [unsavedState, setUnsavedState] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const notify = (msg) => toast(msg);
  const history = (path) => window.history.pushState({}, "", path);

  useEffect(() => {
    if (
      snippet.title !== snippetDIFF.title ||
      snippet.content !== snippetDIFF.content ||
      snippet.language !== snippetDIFF.language
    ) {
      setUnsavedState(true);
    } else {
      setUnsavedState(false);
    }
  }, [
    snippet.title,
    snippet.content,
    snippet.language,
    snippetDIFF.title,
    snippetDIFF.content,
    snippetDIFF.language,
  ]);

  useEffect(() => {
    if (snippet_id) {
      fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet_id)
        .then((res) => res.json())
        .then((data) => {
          setSnippet(data);
          setSnippetDIFF(data);
        });
    }
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets")
      .then((res) => res.json())
      .then((data) => setSnippets(data));
  }, []);

  //   this is for the list component

  const sendDeleteSnippetRequest = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet.shortId, {
      method: "DELETE",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        setSnippet(emptySnippetState);
        setSnippetDIFF(emptySnippetState);

        notify("Snippet deleted");
        setSnippets(snippets.filter((s) => s.shortId !== snippet.shortId));
        history("/");
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
        setSnippetDIFF(updatedSnippet);
        setSnippets([
          updatedSnippet,
          ...snippets.filter((s) => s.shortId !== updatedSnippet.shortId),
        ]);
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
        setSnippetDIFF(newlyCreatedSnippet);
        setSnippets([newlyCreatedSnippet, ...snippets]);

        history("/" + newlyCreatedSnippet.shortId);
        notify("Snippet created");
      });
  };
  const organisedSnippets = () => {
    // 1) if snippet.shortId exists, that means we have an existing snippet from the database
    // and so we can place it at the top of the list
    // 2) sort out the rest of the snippets by date ( reverse chronological order )

    if (snippet.shortId) {
      return [
        snippet,
        ...snippets
          .filter((s) => s.shortId !== snippet.shortId)
          .sort((a, b) => b.updatedAt - a.updatedAt),
      ];
    } else {
      return snippets.sort((a, b) => b.updatedAt - a.updatedAt);
    }
  };
  const resetFields = () => {
    setSnippet(emptySnippetState);
    setSnippetDIFF(emptySnippetState);
    history("/");
  };

  return (
    <SnippetContext.Provider
      value={{
        editor: [snippet, setSnippet],
        unsavedState,
        sendCreateSnippetRequest,
        sendDeleteSnippetRequest,
        sendUpdateSnippetRequest,
        resetFields,
        snippetList: [organisedSnippets(), setSnippets],
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
