import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function NotesDeleteAll() {
  const fetcher = useFetcher<never>();

  return (
    <fetcher.Form
      method="post"
      className="flex flex-col items-center justify-center"
    >
      <Button
        variant="destructive"
        type="submit"
        name="_action"
        value="delete-all"
        aria-label="Delete all notes"
        isLoading={fetcher.state === "submitting"}
      >
        Delete all
      </Button>
    </fetcher.Form>
  );
}
