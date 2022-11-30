import { Form } from "@remix-run/react";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { usePrevious } from "react-use";
import FullInput from "~/components/FullInput";

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

        <button
          type="submit"
          className={classNames("btn btn-primary w-[120px]", {
            loading: isLoading,
          })}
          disabled={isLoading}
          name="_action"
          value="create"
        >
          {!isLoading && "Submit"}
        </button>
      </div>
    </Form>
  );
}
