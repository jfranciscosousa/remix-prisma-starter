import { Note, User } from "@prisma/client";
import {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
  useTransition,
} from "remix";
import { useLoaderData, redirect, json, useActionData } from "remix";
import { createNote, deleteNote, listNotes } from "~/lib/data/notes.server";
import userFromRequest from "~/lib/web/userFromRequest";
import Notes from "~/modules/Notes";

type IndexData = {
  user: User;
  notes: Note[];
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await userFromRequest(request);

  if (!user) return redirect("/login");

  const notes = await listNotes(user);

  return json({ user, notes });
};

export const action: ActionFunction = async ({ request }) => {
  let user = await userFromRequest(request);

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

export let meta: MetaFunction = () => {
  return {
    title: "Remix Prisma Starter",
    description: "Welcome to remix!",
  };
};

export default function NotesPage() {
  const { user, notes } = useLoaderData<IndexData>();
  const actionData = useActionData();
  const { state } = useTransition();
  const isLoading = state === "submitting" || state === "loading";

  return (
    <Notes user={user} notes={notes} isLoading={isLoading} error={actionData} />
  );
}
