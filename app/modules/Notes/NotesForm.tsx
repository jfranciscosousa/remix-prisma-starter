import { Form } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { usePrevious } from "react-use";
import { Button } from "~/components/ui/button";
import { FullInput } from "~/components/ui/full-input";

interface NotesInputProps {
  isLoading: boolean;
  errors?: Record<string, string>;
}

export default function NotesForm({ isLoading, errors }: NotesInputProps) {
  const previousIsLoading = usePrevious(isLoading);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasErrors = errors && Object.keys(errors).length > 1;

  // Clear input when isLoading goes
  // from true to false if there is no error
  useEffect(() => {
    if (!inputRef.current || hasErrors) return;

    if (previousIsLoading && !isLoading) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [isLoading, hasErrors, previousIsLoading]);

  return (
    <Form method="post" className="flex flex-col space-y-4">
      <div className="flex flex-row items-end space-x-4 w-full">
        <FullInput
          label="New todo"
          name="content"
          type="text"
          required
          ref={inputRef}
          className="w-full"
          inputClassName="input-bordered"
          disabled={isLoading}
        />

        <Button
          type="submit"
          isLoading={isLoading}
          name="_action"
          value="create"
          className="w-[120px]"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
