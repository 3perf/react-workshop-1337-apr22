import "./index.css";
// import ReactMarkdown from "react-markdown";
// import gfm from "remark-gfm";
// import { marked } from "marked";
import { useEffect, useState } from "react";
import * as Comlink from "comlink";

const worker = Comlink.wrap(
  new Worker(new URL("./worker.js", import.meta.url), { type: "module" })
);

export default function NoteView({ text }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    worker.processData(text).then((html) => setHtml(html));
  }, [text]);

  // useEffect(() => {
  //   const paragraphs = text.split("\n\n");
  //   let convertedHtml = "";
  //   const abortController = new AbortController();

  //   processChunkOfText();

  //   function processChunkOfText() {
  //     // const begin = performance.now();
  //     // const DEADLINE = 15 // ms

  //     do {
  //       const paragraph = paragraphs.shift();
  //       convertedHtml += marked(paragraph);
  //     } while (
  //       paragraphs.length > 0 &&
  //       !navigator.scheduling.isInputPending() &&
  //       !abortController.signal.aborted
  //       // TODO: also add a performance.now() 15ms deadline if you want to keep it super smooth
  //       // performance.now() < begin + DEADLINE
  //     );

  //     if (paragraphs.length === 0) {
  //       setHtml(convertedHtml);
  //     } else if (!abortController.signal.aborted) {
  //       console.log("input pending");
  //       setTimeout(processChunkOfText, 0);
  //     } else {
  //       console.log("aborted");
  //     }
  //   }

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [text]);

  return (
    <div className="note-view" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
