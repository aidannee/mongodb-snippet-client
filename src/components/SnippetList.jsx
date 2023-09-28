import { useEffect, useContext } from "react";
import SnippetListItem from "./SnippetListItem";
import { SnippetContext } from "../contexts/SnippetContext";
export default function SnippetList() {
  const { snippetList } = useContext(SnippetContext);
  const [snippets, setSnippets] = snippetList;

  useEffect(() => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets")
      .then((res) => res.json())
      .then((data) => setSnippets(data));
  }, []);

  return (
    <div className="flex flex-col h-[60vh] w-[210px] rounded-lg bg-green-100 overflow-hidden hover:overflow-y-scroll">
      {snippets.map((snippet) => (
        <SnippetListItem snippet={snippet} key={snippet.shortId} />
      ))}
    </div>
  );
}
