import { Form } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { usePrevious } from "react-use";
import { Card } from "~/components/ui/card";
import useDates from "~/hooks/useDates";
import { NotesRouteData } from "~/routes/__authed.notes";
import { cn } from "~/utils";

interface NoteProps {
  notes: NotesRouteData["notes"];
  isLoading: boolean;
}

export default function NotesList({ notes, isLoading }: NoteProps) {
  const { formatRelativeTime } = useDates();
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
    <ul className="space-y-6 max-h-full h-full overflow-auto flex flex-col">
      {notes.length === 0 && (
        <div className="flex-grow flex flex-col justify-center items-center">
          <p className="text-center">You have no notes! Please write some.</p>
        </div>
      )}

      {notes.map((note) => (
        <li key={note.id}>
          <Card className="p-4 flex flex-row justify-between">
            <div className="flex flex-col space-y-6">
              <p>{note.content}</p>

              <p className="text-xs opacity-75">
                Created {formatRelativeTime(note.createdAt)} ago
              </p>
            </div>

            <Form
              method="post"
              className="flex flex-col items-center justify-center"
            >
              <input name="id" readOnly value={note.id} className="hidden" />
              <button
                type="submit"
                className={cn("link", {
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
          </Card>
        </li>
      ))}
    </ul>
  );
}
