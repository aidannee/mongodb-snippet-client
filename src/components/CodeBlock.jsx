import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// we use the @uiw/codemirror-theme-vscode  theme

import { ApplicationSettingsContext } from "../contexts/ApplicationSettingsContext";
import { useContext } from "react";
import { SnippetContext } from "../contexts/SnippetContext";
import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { python } from "@codemirror/lang-python";
import { json } from "@codemirror/lang-json";
import { java } from "@codemirror/lang-java";
import {
  githubLight,
  githubLightInit,
  githubDark,
  githubDarkInit,
} from "@uiw/codemirror-theme-github";

const EXTENSIONS = {
  markdown: markdown(),
  python: python(),
  javascript: javascript(),
  typescript: javascript({ typescript: true }),
  jsx: javascript({ jsx: true }),
  tsx: javascript({ jsx: true, typescript: true }),
  cpp: cpp(),
  "c++": cpp(),
  html: html(),
  json: json(),
  java: java(),
};

export default function CodeBlock({ code, handleEdit }) {
  const { editor } = useContext(SnippetContext);
  const [snippet] = editor;

  const { darkMode, toggleDarkMode } = useContext(ApplicationSettingsContext);

  let extensions = [];
  if (snippet.language !== "plaintext") {
    extensions.push(EXTENSIONS[snippet.language]);
  }
  const onChange = (value) => {
    handleEdit(value);
  };
  return (
    <CodeMirror
      height="100%"
      id="cm"
      className="h-screen"
      linewrapping="true"
      value={code}
      theme={darkMode ? githubDark : githubLight}
      extensions={extensions}
      onChange={onChange}
    />
  );
}
