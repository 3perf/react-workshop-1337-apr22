import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import LazyHydrate from "react-lazy-hydration";

export default function NoteView({ text }) {
  const textWithHeader = "## " + text;

  return (
    <div className="note-view">
      <LazyHydrate whenIdle>
        <ReactMarkdown remarkPlugins={[gfm]}>{textWithHeader}</ReactMarkdown>
      </LazyHydrate>
    </div>
  );
}
