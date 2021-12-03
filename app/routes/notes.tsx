import { Note, User } from "@prisma/client";
import { useEffect, useRef } from "react";
import {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
  useTransition,
} from "remix";
import { useLoaderData, redirect, json, Form, useActionData } from "remix";
import { createNote, deleteNote, listNotes } from "~/lib/data/notes.server";
import userFromRequest from "~/lib/web/userFromRequest";

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

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export default function Index() {
  let { user, notes } = useLoaderData<IndexData>();
  const error = useActionData();
  const { state } = useTransition();
  const inputContentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === "idle" && inputContentRef.current) {
      inputContentRef.current.value = "";
    }
  }, [state]);

  return (
    <div>
      <nav className="flex w-full justify-between">
        <p>Welcome, {user.name}!</p>

        <form method="POST" action="/logout">
          <button className="btn">Logout</button>
        </form>
      </nav>

      <main className="max-w-xl mx-auto">
        <div className="h-[500px] space-y-6 overflow-auto">
          {notes.length === 0 && (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-center">
                You have no notes! Please write some.
              </p>
            </div>
          )}

          {notes.map((note) => (
            <div
              key={note.id}
              className="card p-4 bg-base-100 flex flex-row justify-between"
            >
              <p>{note.content}</p>

              <Form method="post">
                <input
                  name="method"
                  readOnly
                  value="delete"
                  className="hidden"
                />
                <input name="id" readOnly value={note.id} className="hidden" />
                <button type="submit" className="link">
                  X
                </button>
              </Form>
            </div>
          ))}
        </div>

        <Form method="post" className="flex flex-col space-y-4 mt-12">
          <div className="flex flex-row items-end space-x-4 w-full">
            <div className="form-control flex-grow">
              <input name="method" readOnly value="create" className="hidden" />
              <label className="label">
                <span className="label-text">New todo</span>
              </label>
              <input
                name="content"
                type="text"
                required
                className="input"
                ref={inputContentRef}
              />
            </div>

            <button type="submit" className="btn btn-primary block">
              Submit
            </button>
          </div>
        </Form>
      </main>
    </div>
  );
}
