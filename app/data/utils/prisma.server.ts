/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { SERVER_ENV } from "~/env.server";

let prisma: PrismaClient;

declare global {
  let __prisma: PrismaClient | undefined;
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (SERVER_ENV.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    datasources: {
      db: {
        url: process.env.DATABASE_PRISMA_URL,
      },
    },
  });
  prisma.$connect();
} else {
  if (!(global as any).__prisma) {
    (global as any).__prisma = new PrismaClient();
    (global as any).__prisma.$connect();
  }
  prisma = (global as any).__prisma;
}

export default prisma;
