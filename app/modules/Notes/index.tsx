import { useActionData, useLoaderData, useTransition } from "remix";
import LoggedInLayout from "~/components/layouts/LoggedInLayout";
import { NotesRouteData } from "~/routes/notes";
import NotesForm from "./NotesForm";
import NotesList from "./NotesList";

export default function Notes() {
  const { user, notes } = useLoaderData<NotesRouteData>();
  const errors = useActionData();
  const { state } = useTransition();
  const isLoading = state === "submitting" || state === "loading";

  return (
    <LoggedInLayout user={user}>
      <main className="max-w-xl mx-auto">
        <div className="h-[500px]">
          {notes.length === 0 && (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-center">
                You have no notes! Please write some.
              </p>
            </div>
          )}

          {notes.length > 0 && (
            <NotesList notes={notes} isLoading={isLoading} />
          )}
        </div>

        <NotesForm isLoading={isLoading} errors={errors} />
      </main>
    </LoggedInLayout>
  );
}
