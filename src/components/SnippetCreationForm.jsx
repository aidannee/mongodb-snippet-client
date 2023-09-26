import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// id
// title
// content
// createdAt
// modifiedAt

export default function SnippetCreationForm() {
  const titleRef = useRef();
  const contentRef = useRef();
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(titleRef.current.value);
    console.log(contentRef.current.value);

    fetch("http://localhost:9000/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        content: contentRef.current.value,
      }),
    })
      .then((httpResponse) => httpResponse.json())
      .then((newlyCreatedSnippet) => {
        history("/" + newlyCreatedSnippet.shortId);
      });
  };
  return (
    <>
      <h1>SnippetCreationForm</h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input type="text" name="title" ref={titleRef} id="title" />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          ref={contentRef}
          cols="30"
          rows="10"
        ></textarea>

        <button type="submit">Create</button>
      </form>
    </>
  );
}
