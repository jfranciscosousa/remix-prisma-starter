import get from "lodash/get";
import { ComponentPropsWithRef, Ref, forwardRef, useId } from "react";
import { cn } from "~/utils";
import { Checkbox } from "./checkbox";

export interface CheckboxFieldProps extends ComponentPropsWithRef<"button"> {
  label: string;
  name: string;
  errors?: Record<string, string> | null;
  inputClassName?: string;
}

const CheckboxField = forwardRef(
  (
    {
      errors,
      name,
      label,
      inputClassName,
      className,
      ...props
    }: CheckboxFieldProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const reactId = useId();
    const id = props.id || reactId;
    const errorMessage = get(errors, name);

    return (
      <div className={cn("items-top flex space-x-2 pb-4", className)}>
        <Checkbox {...props} className={inputClassName} ref={ref} id={id} />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        </div>

        {errorMessage && <p className="pt-4 text-red-500">{errorMessage}</p>}
      </div>
    );
  },
);

CheckboxField.displayName = "CheckboxField";

export { CheckboxField };
