import { clientEnvSchema } from "../app/env";
import { serverEnvSchema } from "../app/env.server";

const serverEnvResult = serverEnvSchema.safeParse(process.env);
const clientEnvResult = clientEnvSchema.safeParse(process.env);

if (!serverEnvResult.success || !clientEnvResult.success) {
  process.exit(-1);
}

console.log("Client and server env vars are valid!");
