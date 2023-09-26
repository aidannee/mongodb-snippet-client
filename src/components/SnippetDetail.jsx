import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SnippetDetail() {
  const history = useNavigate();
  const [snippet, setSnippet] = useState();

  let { snippet_id } = useParams();
  useEffect(() => {
    console.log(snippet_id);
    fetch("http://localhost:9000/snippets/" + snippet_id)
      .then((res) => res.json())
      .then((data) => setSnippet(data));
  }, []);

  const handleDelete = () => {
    fetch(`http://localhost:9000/snippets/${snippet.shortId}`, {
      method: "DELETE",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        history("/");
      } else {
        alert("Something went wrong");
      }
    });
  };
  const handleSave = (shortId) => {
    fetch(`http://localhost:9000/snippets/${snippet.shortId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
      }),
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        alert("Snippet updated");
      } else {
        alert("Chnages not saved");
      }
    });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {snippet ? (
        <div
          style={{ border: "1px solid black", margin: "10px" }}
          key={snippet.shortId}
        >
          <a href={`/${snippet.shortId}`}>{snippet.title}</a>{" "}
          <p>{snippet.shortId}</p>
          <p>{new Date(snippet.updatedAt).toLocaleDateString()}</p>
          <input
            value={snippet.title}
            onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
          ></input>
          <textarea
            value={snippet.content}
            onChange={(e) =>
              setSnippet({ ...snippet, content: e.target.value })
            }
          ></textarea>
          <button onClick={() => handleDelete}>🗑️</button>
          <button onClick={handleSave}>SAVE</button>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
