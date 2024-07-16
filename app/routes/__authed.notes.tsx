import {
  MetaFunction,
  redirect,
  SerializeFrom,
  unstable_defineAction,
  unstable_defineLoader,
} from "@remix-run/node";
import {
  createNote,
  deleteAllNotes,
  deleteNote,
  listNotes,
} from "~/data/notes.server";
import NotesView from "~/modules/Notes/NotesView";
import { userIdFromRequest } from "~/web/auth.server";

export type NotesRouteData = SerializeFrom<typeof loader>;

export const loader = unstable_defineLoader(async ({ request }) => {
  const userId = await userIdFromRequest(request);
  const notes = await listNotes(userId);

  return { notes };
});

export const action = unstable_defineAction(async ({ request }) => {
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
});

export const meta: MetaFunction = () => [
  {
    title: "Notes",
  },
];

export default function NotesPage() {
  return <NotesView />;
}
