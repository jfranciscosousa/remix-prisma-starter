export const CLIENT_ENV_VARS = { EXAMPLE: process.env.EXAMPLE };
export const SERVER_ENV_VARS = {};

/**
 * A module to manage SERVER SIDE environment variables.
 *
 * The module is not named .server.ts so this will CRASH if imported
 * from frontend code.
 */

export function getServerEnvVar(key: keyof typeof SERVER_ENV_VARS) {
  if (typeof window !== "undefined") {
    throw new Error(
      "You cannot access this env variable. It's server only! Please fix this ASAP."
    );
  }

  return process.env[key];
}