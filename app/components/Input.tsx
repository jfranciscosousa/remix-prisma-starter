import classNames from "classnames";
import get from "lodash/get";
import { ComponentPropsWithRef, useId } from "react";

export interface FullInputProps extends ComponentPropsWithRef<"input"> {
  label: string;
  name: string;
  errors?: Record<string, string>;
  inputClassName?: string;
}

export default function FullInput({
  errors,
  name,
  label,
  className,
  inputClassName,
  ...props
}: FullInputProps) {
  const reactId = useId();
  const id = props.id || reactId;
  const errorMessage = get(errors, name);

  return (
    <div className={classNames("form-control", className)}>
      <label className="label" htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>

      <input
        id={id}
        name={name}
        className={classNames("input", inputClassName)}
        {...props}
      />

      {errorMessage && <p className="pt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
}
