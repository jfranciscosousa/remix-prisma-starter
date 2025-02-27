import NotesDeleteAll from "./NotesDeleteAll";
import NotesForm from "./NotesForm";
import NotesList from "./NotesList";

export default function NotesView() {
  return (
    <>
      <main className="mx-auto w-full max-w-xl grow overflow-hidden">
        <NotesList />
      </main>

      <div className="mx-auto w-full max-w-xl shrink-0 py-8">
        <NotesDeleteAll />

        <NotesForm />
      </div>
    </>
  );
}
