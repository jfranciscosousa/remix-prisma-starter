import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import { FullInput } from "~/components/ui/full-input";

export default function NotesForm() {
  const fetcher = useFetcher();
  const inputRef = useRef<HTMLInputElement>(null);
  const isAdding =
    fetcher.state === "submitting" &&
    fetcher.formData?.get("_action") === "create";

  useEffect(() => {
    if (!isAdding || !inputRef.current) return;

    inputRef.current.value = "";
    inputRef.current.focus();
  }, [isAdding]);

  return (
    <fetcher.Form method="post" className="flex flex-col space-y-4">
      <div className="flex flex-row items-end space-x-4 w-full">
        <FullInput
          label="New todo"
          name="content"
          type="text"
          required
          ref={inputRef}
          className="w-full"
          inputClassName="input-bordered"
        />

        <Button
          type="submit"
          isLoading={fetcher.state === "submitting"}
          name="_action"
          value="create"
          className="w-[120px]"
        >
          Submit
        </Button>
      </div>
    </fetcher.Form>
  );
}
