import classNames from "classnames";
import { useEffect, useRef } from "react";
import { usePrevious } from "react-use";

import { Form } from "remix";

interface NotesInputProps {
  isLoading: boolean;
  errors?: Record<string, string>;
}

export default function NotesInput({ isLoading, errors }: NotesInputProps) {
  const previousIsLoading = usePrevious(isLoading);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasErrors = errors && Object.keys(errors).length > 1;

  // Clear input when isLoading goes
  // from true to false if there is no error
  useEffect(() => {
    if (!inputRef.current || hasErrors) return;

    if (previousIsLoading && !isLoading) {
      inputRef.current.value = "";
    }
  }, [isLoading, hasErrors, previousIsLoading]);

  return (
    <Form method="post" className="flex flex-col space-y-4 mt-12">
      <div className="flex flex-row items-end space-x-4 w-full">
        <div className="form-control flex-grow">
          <label className="label" htmlFor="notes-content">
            <span className="label-text">New todo</span>
          </label>
          <input
            id="notes-content"
            name="content"
            type="text"
            required
            className="input input-bordered"
            ref={inputRef}
          />
        </div>

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
