import { User, Note } from "@prisma/client";
import LoggedInLayout from "~/components/layouts/LoggedInLayout";
import NotesInput from "./NotesInput";
import NotesList from "./NotesList";

interface NotesProps {
  user: User;
  notes: Note[];
  isLoading: boolean;
  error?: string;
}

export default function Notes({ user, notes, isLoading, error }: NotesProps) {
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

        <NotesInput isLoading={isLoading} error={error} />
      </main>
    </LoggedInLayout>
  );
}
