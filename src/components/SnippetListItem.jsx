import relativeDate from "../utils/relative-date";
export default function SnippetListItem({ snippet }) {
  return (
    <>
      <div className=" border-2 border-purple-100 rounded-lg m-2 px-1">
        <a
          href={`/${snippet.shortId}`}
          className="underline text-blue-600 hover:text-blue-900 break-words"
        >
          {snippet.title ? snippet.title : "Untitled Snippet"}
        </a>{" "}
        <p>{relativeDate(new Date(snippet.updatedAt))}</p>
      </div>
    </>
  );
}
