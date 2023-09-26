import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SnippetDetail from "./components/SnippetDetail";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/:snippet_id" element={<SnippetDetail />} />
        </Routes>{" "}
      </BrowserRouter>{" "}
      <p className="read-the-docs">i am on every page</p>
    </>
  );
}

export default App;
