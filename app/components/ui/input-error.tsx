import get from "lodash/get";

export interface InputErrorProps {
  errors?: Record<string, string>;
  path: string;
}

function InputError({ errors, path }: InputErrorProps) {
  const errorMessage = get(errors, path);

  if (!errorMessage) return null;

  return <p className="text-red-500">{errorMessage}</p>;
}

export { InputError };
