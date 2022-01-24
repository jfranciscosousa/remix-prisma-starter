import { Note, User } from "@prisma/client";
import {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
  redirect,
  json,
} from "remix";
import { createNote, deleteNote, listNotes } from "~/data/notes.server";
import userFromRequest from "~/web/userFromRequest.server";
import Notes from "~/modules/Notes";

export type NotesRouteData = {
  user: User;
  notes: Note[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (!user) return redirect("/login");

  const notes = await listNotes(user);

  return json({ user, notes });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (!user) return redirect("/login");

  const form = Object.fromEntries(await request.formData());

  switch (form._action) {
    case "create":
      await createNote(user, {
        content: form.content as string,
      });
      break;

    case "delete":
      await deleteNote(user, form.id as string);
      break;
  }

  return redirect("/notes");
};

export const meta: MetaFunction = () => ({
  title: "Remix Prisma Starter",
  description: "Welcome to remix!",
});

export default function NotesPage() {
  return <Notes />;
}
