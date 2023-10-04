import { useContext, useEffect, useState } from "react";
import CodeBlock from "./CodeBlock";
import "../App.css";
import { data } from "autoprefixer";
import { SnippetContext } from "../contexts/SnippetContext";
export default function Editor() {
  const { editor } = useContext(SnippetContext);
  const [snippet, setSnippet] = editor;

  const handleEdit = (value) => {
    setSnippet({ ...snippet, content: value });
  };

  return (
    <div className="mt-14 md:mt-0">
      <CodeBlock code={snippet.content} handleEdit={handleEdit} />
    </div>
  );
}
