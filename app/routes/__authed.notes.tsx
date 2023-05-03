import {
  ActionFunction,
  DataFunctionArgs,
  redirect,
  SerializeFrom,
  V2_MetaFunction,
} from "@remix-run/node";
import { createNote, deleteNote, listNotes } from "~/data/notes.server";
import Notes from "~/modules/Notes";
import { userIdFromRequest } from "~/web/auth.server";

export const config = { runtime: "edge" };

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
  }

  return redirect("/notes");
};

export const meta: V2_MetaFunction = () => [
  {
    title: "Remix Prisma Starter",
  },
  {
    description: "Welcome to remix!",
  },
];

export default function NotesPage() {
  return <Notes />;
}
