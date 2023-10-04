import { useEffect, useContext } from "react";
import SnippetListItem from "./SnippetListItem";
import { SnippetContext } from "../contexts/SnippetContext";
import { ApplicationSettingsContext } from "../contexts/ApplicationSettingsContext";

export default function SnippetList() {
  const { snippetList } = useContext(SnippetContext);
  const [snippets, setSnippets] = snippetList;

  const { darkMode, toggleDarkMode } = useContext(ApplicationSettingsContext);
  return (
    <div
      className={`flex flex-col  max-h-screen w-[210px] rounded-lg ${
        darkMode ? `bg-green-200` : `bg-green-800 text-white`
      } overflow-hidden hover:overflow-y-scroll`}
    >
      {snippets.map((snippet) => (
        <SnippetListItem snippet={snippet} key={snippet.shortId} />
      ))}
    </div>
  );
}
