import get from "lodash/get";

interface InputErrorProps {
  errors?: Record<string, string>;
  path: string;
}

export default function InputError({ errors, path }: InputErrorProps) {
  const errorMessage = get(errors, path);

  if (!errorMessage) return null;

  return <p className="pt-4 text-red-500">{errorMessage}</p>;
}
