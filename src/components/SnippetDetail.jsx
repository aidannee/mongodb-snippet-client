import { useParams } from "react-router-dom";

export default function SnippetDetail() {
  let { snippet_id } = useParams;
  return (
    <>
      <p>snippet_id= {snippet_id}</p>
    </>
  );
}
