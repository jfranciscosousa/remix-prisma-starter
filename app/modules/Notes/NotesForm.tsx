import { Form, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import { FullInput } from "~/components/ui/full-input";
import useIsLoading from "~/hooks/useIsLoading";

export default function NotesForm() {
  const navigation = useNavigation();
  const isLoading = useIsLoading();
  const inputRef = useRef<HTMLInputElement>(null);
  const isAdding =
    navigation.state === "submitting" &&
    navigation.formData?.get("_action") === "create";

  useEffect(() => {
    if (!isAdding || !inputRef.current) return;

    inputRef.current.value = "";
    inputRef.current.focus();
  }, [isAdding]);

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
