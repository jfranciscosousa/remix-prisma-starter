import classNames from "classnames";
import { useEffect, useRef } from "react";
import { usePrevious } from "react-use";
import { Form } from "remix";
import { useRootLoaderData } from "~/root";
import { NotesRouteData } from "~/routes/app/notes";

interface NoteProps {
  notes: NotesRouteData["notes"];
  isLoading: boolean;
}

export default function NotesList({ notes, isLoading }: NoteProps) {
  const { locale } = useRootLoaderData();
  const previousNotesLength = usePrevious<number>(notes.length);
  const notesContainerRef = useRef<HTMLUListElement>(null);

  // Scroll the notes to bottom if a new one comes in
  useEffect(() => {
    if (notes.length > (previousNotesLength || 0)) {
      if (notesContainerRef.current) {
        notesContainerRef.current.scrollTop =
          notesContainerRef.current.scrollHeight;
        notesContainerRef.current.clientHeight;
      }
    }
  }, [notes.length, previousNotesLength]);

  return (
    <ul className="space-y-6 max-h-full overflow-auto" ref={notesContainerRef}>
      {notes.map((note) => (
        <li
          key={note.id}
          className="card p-4 bg-base-200 flex flex-row justify-between"
        >
          <div className="flex flex-col space-y-6">
            <p>{note.content}</p>

            <p className="text-xs opacity-75">
              Created at: {new Date(note.createdAt).toLocaleString(locale)}
            </p>
          </div>

          <Form
            method="post"
            className="flex flex-col items-center justify-center"
          >
            <input name="id" readOnly value={note.id} className="hidden" />
            <button
              type="submit"
              className={classNames("link", {
                "cursor-not-allowed": isLoading,
              })}
              disabled={isLoading}
              name="_action"
              value="delete"
              aria-label="Delete note"
            >
              X
            </button>
          </Form>
        </li>
      ))}
    </ul>
  );
}
