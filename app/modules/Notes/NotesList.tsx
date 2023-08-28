import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { usePrevious } from "react-use";
import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import useDates from "~/hooks/useDates";
import useIsLoading from "~/hooks/useIsLoading";
import { NotesRouteData } from "~/routes/__authed.notes";
import { cn } from "~/utils";

export default function NotesList() {
  const { notes } = useLoaderData<NotesRouteData>();
  const { formatRelativeTime } = useDates();
  const previousNotesLength = usePrevious<number>(notes.length);
  const notesContainerRef = useRef<HTMLDivElement>(null);
  const isLoading = useIsLoading();

  // Scroll the notes to bottom if a new one comes in
  useEffect(() => {
    if (notes.length > (previousNotesLength || 0)) {
      if (!notesContainerRef.current) return;

      const scrollingContainer = notesContainerRef.current.querySelector("div");

      if (!scrollingContainer) return;

      scrollingContainer.scrollTop = scrollingContainer.scrollHeight;
    }
  }, [notes.length, previousNotesLength]);

  if (notes.length === 0)
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-center">You have no notes! Please write some.</p>
      </div>
    );

  return (
    <ScrollArea className="max-h-full h-full" ref={notesContainerRef}>
      <ul className="space-y-6 flex flex-col">
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
    </ScrollArea>
  );
}
