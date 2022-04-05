import { memo, useCallback, useMemo, useState, useTransition } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";
import "./index.css";
import _ from "lodash";

const NoteButtonMemoWrapper = memo(function NoteButtonMemoWrapper({
  id,
  activeNoteId,
  onNoteActivated,
  text,
  filterText,
  date,
}) {
  const onNoteActivatedCb = useCallback(
    () => onNoteActivated(id),
    [onNoteActivated, id]
  );
  return (
    <NoteButton
      isActive={activeNoteId === id}
      onNoteActivated={onNoteActivatedCb}
      text={text}
      filterText={filterText}
      date={date}
    />
  );
});

function NotesList({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) {
  const [filterInput, setFilterInput] = useState("");
  const [filterValue, setFilterValue] = useState("");
  // const [isTransitioning, startTransition] = useTransition();

  // const setFilterValueDebounced = useMemo(
  //   () => _.throttle(setFilterValue, 500),
  //   []
  // );

  return (
    <div
      className="notes-list"
      style={{ position: "relative" /*, opacity: isTransitioning ? 0.5 : 1 */ }}
    >
      <div className="notes-list__filter">
        <FilterInput
          filter={filterInput}
          onChange={(text) => {
            setFilterInput(text);
            startTransition(() => {
              // ALL_NEXT_UPDATES_PRIORITY = "non_critical"
              setFilterValue(text);

              /*
                while (update_priority === "non_critical" && noPendingUpdates()) { // → isInputPending()
                  renderNextComponent() // → <ReactMarkdown> → 300ms
                }
              */
            });
          }}
          noteCount={Object.keys(notes).length}
        />
      </div>

      <div className="notes-list__notes">
        {Object.values(notes)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .filter(({ text }) => {
            if (!filterValue) {
              return true;
            }

            return text.toLowerCase().includes(filterValue.toLowerCase());
          })
          .map(({ id, text, date }) => (
            <NoteButtonMemoWrapper
              key={id}
              id={id}
              activeNoteId={activeNoteId}
              onNoteActivated={onNoteActivated}
              text={text}
              filterText={filterValue}
              date={date}
            />
          ))}
      </div>

      <div className="notes-list__controls">
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 1 })}
          >
            + Note
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 300 })}
          >
            + Huge
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 100, paragraphs: 1 })}
          >
            + 100
          </Button>
        </ButtonGroup>
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onDeleteAllRequested()}
          >
            Delete all
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default NotesList;
