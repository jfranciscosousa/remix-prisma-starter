import { User, Note } from "@prisma/client";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { usePrevious } from "react-use";
import { Form } from "remix";
import LoggedInLayout from "~/components/layouts/LoggedInLayout";
import useLocale from "~/lib/hooks/useLocale";

interface NotesProps {
  user: User;
  notes: Note[];
  isLoading: boolean;
  error?: string;
}

export default function Notes({ user, notes, isLoading }: NotesProps) {
  const locale = useLocale();
  const previousNotesLength = usePrevious<number>(notes.length);
  const notesContainerRef = useRef<HTMLUListElement>(null);
  const inputContentRef = useRef<HTMLInputElement>(null);

  // Scroll the notes to bottom if a new one comes in
  useEffect(() => {
    if (notes.length > (previousNotesLength || 0)) {
      if (inputContentRef.current) inputContentRef.current.value = "";

      if (notesContainerRef.current) {
        notesContainerRef.current.scrollTop =
          notesContainerRef.current.scrollHeight;
        notesContainerRef.current.clientHeight;
      }
    }
  }, [notes.length, previousNotesLength]);

  return (
    <LoggedInLayout user={user}>
      <main className="max-w-xl mx-auto">
        <div className="h-[500px] space-y-6">
          {notes.length === 0 && (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-center">
                You have no notes! Please write some.
              </p>
            </div>
          )}

          {notes.length > 0 && (
            <ul
              className="space-y-6 max-h-full overflow-auto"
              ref={notesContainerRef}
            >
              {notes.map((note) => (
                <li
                  key={note.id}
                  className="card p-4 bg-base-200 flex flex-row justify-between"
                >
                  <div className="flex flex-col space-y-6">
                    <p>{note.content}</p>

                    <p className="text-xs opacity-75">
                      Created at:{" "}
                      {new Date(note.createdAt).toLocaleString(locale)}
                    </p>
                  </div>

                  <Form
                    method="post"
                    className="flex flex-col items-center justify-center"
                  >
                    <input
                      name="method"
                      readOnly
                      value="delete"
                      className="hidden"
                    />
                    <input
                      name="id"
                      readOnly
                      value={note.id}
                      className="hidden"
                    />
                    <button
                      type="submit"
                      className={classNames("link", {
                        "cursor-not-allowed": isLoading,
                      })}
                      disabled={isLoading}
                    >
                      X
                    </button>
                  </Form>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Form method="post" className="flex flex-col space-y-4 mt-12">
          <div className="flex flex-row items-end space-x-4 w-full">
            <div className="form-control flex-grow">
              <input name="method" readOnly value="create" className="hidden" />
              <label className="label" htmlFor="notes-content">
                <span className="label-text">New todo</span>
              </label>
              <input
                id="notes-content"
                name="content"
                type="text"
                required
                className="input input-bordered"
                ref={inputContentRef}
              />
            </div>

            <button
              type="submit"
              className={classNames("btn btn-primary w-[120px]", {
                loading: isLoading,
              })}
              disabled={isLoading}
            >
              {!isLoading && "Submit"}
            </button>
          </div>
        </Form>
      </main>
    </LoggedInLayout>
  );
}
