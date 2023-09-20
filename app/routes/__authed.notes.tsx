import {
  ActionFunction,
  DataFunctionArgs,
  SerializeFrom,
  MetaFunction,
  redirect,
} from "@vercel/remix";
import NotesDeleteAll from "~/modules/Notes/NotesDeleteAll";
import NotesForm from "~/modules/Notes/NotesForm";
import NotesList from "~/modules/Notes/NotesList";
import { userIdFromRequest } from "~/server/auth.server";
import {
  createNote,
  deleteAllNotes,
  deleteNote,
  listNotes,
} from "~/server/notes.server";

export type NotesRouteData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const userId = await userIdFromRequest(request);
  const notes = await listNotes(userId);

  return { notes };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await userIdFromRequest(request);
  const form = Object.fromEntries(await request.formData());

  switch (form._action) {
    case "create":
      await createNote(userId, {
        content: form.content as string,
      });
      break;

    case "delete":
      await deleteNote(userId, form.id as string);
      break;

    case "delete-all":
      await deleteAllNotes(userId);
      break;
  }

  return redirect("/notes");
};

export const meta: MetaFunction = () => [
  {
    title: "Remix Prisma Starter",
  },
  {
    description: "Welcome to remix!",
  },
];

export default function NotesPage() {
  return (
    <>
      <main className="max-w-xl w-full mx-auto flex-grow overflow-hidden">
        <NotesList />
      </main>

      <div className="shrink-0 max-w-xl w-full mx-auto py-8">
        <NotesDeleteAll />

        <NotesForm />
      </div>
    </>
  );
}
