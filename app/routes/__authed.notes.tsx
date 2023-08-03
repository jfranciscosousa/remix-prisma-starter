import { useActionData, useLoaderData } from "@remix-run/react";
import {
  ActionFunction,
  DataFunctionArgs,
  SerializeFrom,
  V2_MetaFunction,
  redirect,
} from "@vercel/remix";
import {
  createNote,
  deleteAllNotes,
  deleteNote,
  listNotes,
} from "~/data/notes.server";
import useIsLoading from "~/hooks/useIsLoading";
import NotesDeleteAll from "~/modules/Notes/NotesDeleteAll";
import NotesForm from "~/modules/Notes/NotesForm";
import NotesList from "~/modules/Notes/NotesList";
import { userIdFromRequest } from "~/web/auth.server";

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

export const meta: V2_MetaFunction = () => [
  {
    title: "Remix Prisma Starter",
  },
  {
    description: "Welcome to remix!",
  },
];

export default function NotesPage() {
  const { notes } = useLoaderData<NotesRouteData>();
  const errors = useActionData();
  const isLoading = useIsLoading();

  return (
    <>
      <main className="max-w-xl w-full mx-auto flex-grow overflow-hidden">
        <NotesList notes={notes} isLoading={isLoading} />
      </main>

      <div className="shrink-0 max-w-xl w-full mx-auto py-8">
        <NotesDeleteAll />

        <NotesForm isLoading={isLoading} errors={errors} />
      </div>
    </>
  );
}
