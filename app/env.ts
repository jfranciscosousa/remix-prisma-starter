import z from "zod";
import { generateErrorMessage } from "zod-error";

export const clientEnvSchema = z.object({
  PUBLIC_EXAMPLE: z.string().optional(),
  EXAMPLE_GLOBAL_FEATURE_FLAG: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v === "true"),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

/** Zod will filter all the keys not specified on the schema */
function buildEnv(): ClientEnv {
  try {
    return clientEnvSchema.parse(process.env);
  } catch (error: unknown) {
    console.error("Warning: invalid client env vars!");
    console.error(
      generateErrorMessage((error as z.ZodError).issues, {
        delimiter: { error: "\n" },
      }),
    );

    return {} as ClientEnv;
  }
}

/**
 * If we are on a browser environment, we get the vars from the `window` object.
 * We set this on the root.tsx file on around line 58.
 *
 * If we are on a server environment, we just read it from process.env.
 *
 * Remember that CLIENT_ENV vars can be accessed from any context.
 */
export const CLIENT_ENV =
  typeof window === "undefined"
    ? buildEnv()
    : (window as unknown as { ENV: ClientEnv }).ENV;
