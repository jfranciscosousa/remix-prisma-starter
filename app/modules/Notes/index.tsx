import { useActionData, useLoaderData, useTransition } from "remix";
import { NotesRouteData } from "~/routes/__authed/notes";
import NotesForm from "./NotesForm";
import NotesList from "./NotesList";

export default function Notes() {
  const { notes } = useLoaderData<NotesRouteData>();
  const errors = useActionData();
  const { state } = useTransition();
  const isLoading = state === "submitting" || state === "loading";

  return (
    <>
      <main className="max-w-xl w-full mx-auto flex-grow overflow-auto">
        {notes.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-center">You have no notes! Please write some.</p>
          </div>
        )}

        {notes.length > 0 && <NotesList notes={notes} isLoading={isLoading} />}
      </main>

      <div className="shrink-0 max-w-xl w-full mx-auto py-8">
        <NotesForm isLoading={isLoading} errors={errors} />
      </div>
    </>
  );
}
