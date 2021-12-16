import { Note, User } from "@prisma/client";
import {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
  useTransition,
  useLoaderData,
  redirect,
  json,
  useActionData,
} from "remix";
import { createNote, deleteNote, listNotes } from "~/data/notes.server";
import userFromRequest from "~/web/userFromRequest.server";
import Notes from "~/modules/Notes";

type NotesData = {
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

  const form = await request.formData();

  switch (form.get("method")) {
    case "create":
      await createNote(user, {
        content: form.get("content") as string,
      });
      break;

    case "delete":
      await deleteNote(user, form.get("id") as string);
      break;
  }

  return redirect("/notes");
};

export const meta: MetaFunction = () => ({
  title: "Remix Prisma Starter",
  description: "Welcome to remix!",
});

export default function NotesPage() {
  const { user, notes } = useLoaderData<NotesData>();
  const actionData = useActionData();
  const { state } = useTransition();
  const isLoading = state === "submitting" || state === "loading";

  return (
    <Notes user={user} notes={notes} isLoading={isLoading} error={actionData} />
  );
}
