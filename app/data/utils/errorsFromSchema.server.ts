import z from "zod";

function capitalize(string: string) {
  const lower = string.toLowerCase();

  return string.charAt(0).toUpperCase() + lower.slice(1);
}

/**
 * Returns a key value object with all the errors after trying
 * to parse `value` with schema.
 *
 * Useful to validate forms.
 */
export default function errorsFromSchema<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  value: unknown,
): undefined | Record<string, string> {
  try {
    schema.parse(value);
  } catch (error) {
    return Object.fromEntries(
      (error as z.ZodError).issues.map((errorObj) => [
        errorObj.path,
        capitalize(errorObj.message),
      ]),
    );
  }
}
