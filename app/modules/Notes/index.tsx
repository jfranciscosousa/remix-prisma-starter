import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { NotesRouteData } from "~/routes/__authed.notes";
import NotesForm from "./NotesForm";
import NotesList from "./NotesList";

export default function Notes() {
  const { notes } = useLoaderData<NotesRouteData>();
  const errors = useActionData();
  const navigation = useNavigation();
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <>
      <main className="max-w-xl w-full mx-auto flex-grow overflow-hidden">
        <NotesList notes={notes} isLoading={isLoading} />
      </main>

      <div className="shrink-0 max-w-xl w-full mx-auto py-8">
        <NotesForm isLoading={isLoading} errors={errors} />
      </div>
    </>
  );
}
