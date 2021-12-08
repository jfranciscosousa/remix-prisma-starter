/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  let __prisma: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: `${process.env.DATABASE_URL}?connection_limit=20`,
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
