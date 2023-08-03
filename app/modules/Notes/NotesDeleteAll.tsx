import { Form } from "@remix-run/react";

export default function NotesDeleteAll() {
  return (
    <Form method="post" className="flex flex-col items-center justify-center">
      <button
        type="submit"
        name="_action"
        value="delete-all"
        aria-label="Delete all notes"
      >
        Delete all
      </button>
    </Form>
  );
}
