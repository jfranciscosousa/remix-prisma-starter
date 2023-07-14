/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, PrismaClient } from "@prisma/client";
import { SERVER_ENV } from "~/env.server";
import { userFeatureFlagExtension } from "./userFeatureFlags.server";
import {
  Args,
  DefaultArgs,
  DynamicClientExtensionThis,
} from "@prisma/client/runtime/library";

function buildClient() {
  const client = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  }).$extends(userFeatureFlagExtension);

  return client;
}

/**
 * The type of the PrismaClient with extensions
 */
export type PrismaClientType = ReturnType<typeof buildClient>;
/**
 * The type of the client when applying extensions to our prisma client.
 *
 * Check the `userFeatureFlagExtension` for a live example.
 */
export type PrismaClientExtensionType = DynamicClientExtensionThis<
  Prisma.TypeMap<Args & DefaultArgs>,
  Prisma.TypeMapCb,
  DefaultArgs
>;

let prisma: PrismaClientType;

declare global {
  let __prisma: PrismaClientType | undefined;
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (SERVER_ENV.NODE_ENV === "production") {
  prisma = buildClient();
  prisma.$connect();
} else {
  if (!(global as any).__prisma) {
    (global as any).__prisma = buildClient();
    (global as any).__prisma.$connect();
  }
  prisma = (global as any).__prisma;
}

export default prisma;
