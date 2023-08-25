import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function NotesDeleteAll() {
  return (
    <Form method="post" className="flex flex-col items-center justify-center">
      <Button
        variant="destructive"
        type="submit"
        name="_action"
        value="delete-all"
        aria-label="Delete all notes"
      >
        Delete all
      </Button>
    </Form>
  );
}
