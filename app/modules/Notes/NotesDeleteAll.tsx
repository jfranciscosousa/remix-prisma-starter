import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import useIsLoading from "~/hooks/useIsLoading";

export default function NotesDeleteAll() {
  const isLoading = useIsLoading();

  return (
    <Form method="post" className="flex flex-col items-center justify-center">
      <Button
        variant="destructive"
        type="submit"
        name="_action"
        value="delete-all"
        aria-label="Delete all notes"
        isLoading={isLoading}
      >
        Delete all
      </Button>
    </Form>
  );
}
