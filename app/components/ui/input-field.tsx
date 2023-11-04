import get from "lodash/get";
import { ComponentPropsWithRef, forwardRef, Ref, useId } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "~/utils";

export interface InputFieldProps extends ComponentPropsWithRef<"input"> {
  label: string;
  name: string;
  errors?: Record<string, string> | null;
  inputClassName?: string;
}

const InputField = forwardRef(
  (
    {
      errors,
      name,
      label,
      className,
      inputClassName,
      ...props
    }: InputFieldProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const reactId = useId();
    const id = props.id || reactId;
    const errorMessage = get(errors, name);

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <Label htmlFor={id}>{label}</Label>

        <Input
          ref={ref}
          id={id}
          name={name}
          className={cn("input w-full", inputClassName)}
          {...props}
        />

        {errorMessage && <p className="pt-4 text-red-500">{errorMessage}</p>}
      </div>
    );
  },
);

InputField.displayName = "FullInput";

export { InputField };
