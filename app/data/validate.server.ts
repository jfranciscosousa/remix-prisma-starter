import { ValidationError, ObjectSchema, AnyObject } from "yup";

function capitalize(string: string) {
  const lower = string.toLowerCase();

  return string.charAt(0).toUpperCase() + lower.slice(1);
}

export default function errorsFromSchema<T extends AnyObject>(
  schema: ObjectSchema<T>,
  value: unknown
): undefined | Record<string, string> {
  try {
    schema.validateSync(value, { abortEarly: false });
  } catch (error) {
    return Object.fromEntries(
      (error as ValidationError).inner.map((errorObj) => [
        errorObj.path,
        capitalize(errorObj.message),
      ])
    );
  }
}
