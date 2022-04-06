import { marked } from "marked";
import { format } from "date-fns";
import "./index.css";
import { useLayoutEffect, useMemo, useRef } from "react";

function NoteButton({ isActive, onNoteActivated, text, filterText, date }) {
  const noteHeader = useRef();
  const noteHeaderText = useMemo(
    () => generateNoteHeader(text, filterText),
    [text, filterText]
  );

  // Add an fadeout if the element is overflown.
  // We’re using a layout effect to ensure the fade is applied before the element renders
  useLayoutEffect(() => {
    if (noteHeader.current) {
      const isOverflowing =
        noteHeader.current.scrollWidth > noteHeader.current.clientWidth;

      noteHeader.current.classList.toggle(
        "notes-list__note-header_overflowing",
        isOverflowing
      );
    }
  }, [text]);

  const className = [
    "notes-list__button",
    "notes-list__note",
    isActive && "notes-list__note_active",
  ]
    .filter((i) => i !== false)
    .join(" ");

  return (
    <button className={className} onClick={onNoteActivated}>
      <span className="notes-list__note-meta">
        {format(date, "d MMM yyyy")}
      </span>
      <span className="notes-list__note-header" ref={noteHeader}>
        {noteHeaderText}
      </span>
    </button>
  );
}

function generateNoteHeader(text, filterText) {
  let firstLine = text
    .split("\n")
    .map((i) => i.trim())
    .filter((i) => i.length > 0)[0];

  // Wrap the filter text with a `<mark>` tag
  if (
    filterText &&
    firstLine.toLowerCase().includes(filterText.toLowerCase())
  ) {
    // If `filterText` is `aa`, this splits `bbbbaacccaac` into ['bbb', 'aa', 'ccc', 'aa', 'c']
    // Based on example 2 in https://stackoverflow.com/a/25221523/1192426
    const firstLineParts = firstLine.split(
      new RegExp(
        "(" + filterText.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + ")",
        "gi"
      )
    );

    // This wraps all `filterText` entries with a `del` tag.
    // ['bbb', 'aa', 'ccc', 'aa', 'c'] => ['bbb', '~~aa~~', 'ccc', '~~aa~~', 'c'] => 'bbb~~aa~~ccc~~aa~~c'
    firstLine = firstLineParts
      .map((part) => {
        if (part.toLowerCase() === filterText.toLowerCase()) {
          return `<mark>${part}</mark>`;
        }

        return part;
      })
      .join("");
  }

  const htmlText = marked(firstLine, {
    gfm: true,
  })
    .replace("<p>", "")
    .replace("</p>", "")
    .trim();

  return <span dangerouslySetInnerHTML={{ __html: htmlText }} />;
}

export default NoteButton;
