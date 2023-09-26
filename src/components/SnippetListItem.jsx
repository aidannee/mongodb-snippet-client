import relativeDate from "../utils/relative-date";
export default function SnippetListItem({ snippet, handleDelete }) {
  return (
    <>
      <div style={{ border: "1px solid black", margin: "10px" }}>
        <a href={`/${snippet.shortId}`}>
          {snippet.title ? snippet.title : "Untitled Snippet"}
        </a>{" "}
        <p>{relativeDate(new Date(snippet.updatedAt))}</p>
      </div>
    </>
  );
}
