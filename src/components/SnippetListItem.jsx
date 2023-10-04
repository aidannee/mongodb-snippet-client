import relativeDate from "../utils/relative-date";
import { useContext } from "react";
import { ApplicationSettingsContext } from "../contexts/ApplicationSettingsContext";
export default function SnippetListItem({ snippet }) {
  const { darkMode, toggleDarkMode } = useContext(ApplicationSettingsContext);
  return (
    <>
      <div className=" border-2 border-blue-200 rounded-lg m-2 px-1">
        <a
          href={`/${snippet.shortId}`}
          className={`${
            darkMode
              ? `underline text-blue-600 hover:text-blue-900`
              : `underline text-blue-200 hover:text-blue-600`
          } break-words`}
        >
          {snippet.title ? snippet.title : "Untitled Snippet"}
        </a>{" "}
        <p>{snippet.language}</p>
        <p>{relativeDate(new Date(snippet.updatedAt))}</p>
      </div>
    </>
  );
}
