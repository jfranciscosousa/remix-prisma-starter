import z from "zod";
import { generateErrorMessage } from "zod-error";

export const clientEnvSchema = z.object({
  PUBLIC_EXAMPLE: z.string(),
});

type ConfigSchema = z.infer<typeof clientEnvSchema>;

/** Zod will filter all the keys not specified on the schema */
function buildEnv(): ConfigSchema {
  try {
    return clientEnvSchema.parse(process.env);
  } catch (error: unknown) {
    console.error("Warning: invalid client env vars!");
    console.error(
      generateErrorMessage((error as z.ZodError).issues, {
        delimiter: { error: "\n" },
      })
    );

    return {} as ConfigSchema;
  }
}
export const CLIENT_ENV =
  typeof window === "undefined"
    ? buildEnv()
    : (window as unknown as { ENV: ConfigSchema }).ENV;
