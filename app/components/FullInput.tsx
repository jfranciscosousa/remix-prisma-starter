import classNames from "classnames";
import get from "lodash/get";
import { ComponentPropsWithRef, forwardRef, Ref, useId } from "react";

export interface FullInputProps extends ComponentPropsWithRef<"input"> {
  label: string;
  name: string;
  errors?: Record<string, string> | null;
  inputClassName?: string;
}

const FullInput = forwardRef(
  (
    {
      errors,
      name,
      label,
      className,
      inputClassName,
      ...props
    }: FullInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const reactId = useId();
    const id = props.id || reactId;
    const errorMessage = get(errors, name);

    return (
      <div className={classNames("form-control block", className)}>
        <label className="label" htmlFor={id}>
          <span className="label-text">{label}</span>
        </label>

        <input
          ref={ref}
          id={id}
          name={name}
          className={classNames("input w-full", inputClassName)}
          {...props}
        />

        {errorMessage && <p className="pt-4 text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

FullInput.displayName = "FullInput";

export default FullInput;
