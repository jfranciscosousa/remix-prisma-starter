import { Prisma, PrismaClient } from "@prisma/client";

// This only works for MySQL!
export async function truncateAll() {
  const client = new PrismaClient();
  const tables = getTables();
  const commands = tables.map((table) => truncateTable(client, table));

  await Promise.all(commands);

  await client.$disconnect();
}

export function truncateTable(client: PrismaClient, table: string) {
  return client.$executeRawUnsafe(`TRUNCATE TABLE ${table};`);
}

function getTables() {
  return Prisma.dmmf.datamodel.models.map((model) => {
    return model.dbName || model.name;
  });
}
