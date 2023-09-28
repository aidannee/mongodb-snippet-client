import { createContext, useState } from "react";
import { AVAILABLE_LANGUAGES } from "../enums/editor";
export const SnippetContext = createContext(null);

export const SnippetProvider = ({ children }) => {
  // this is for the editor and nav bar
  const [snippet, setSnippet] = useState({
    title: "",
    content: "",
    language: AVAILABLE_LANGUAGES.javascript,
  });
  //   this is for the list component
  const [snippets, setSnippets] = useState([]);

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

  return (
    <SnippetContext.Provider
      value={{
        editor: [snippet, setSnippet],
        snippetList: [organisedSnippets(), setSnippets],
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
