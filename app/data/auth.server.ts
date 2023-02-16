import { User } from "@prisma/client";
import prisma from "./utils/prisma.server";
import { verifyPassword } from "./passwordUtils.server";
import { DataResult } from "./utils/types";
import errorsFromSchema from "./validate.server";
import z from "zod";

const loginParams = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginParams = z.infer<typeof loginParams>;

// eslint-disable-next-line import/prefer-default-export
export async function login(params: LoginParams): Promise<DataResult<User>> {
  const errors = errorsFromSchema(loginParams, params);

  if (errors) return { errors };

  const user = await prisma.user.findUnique({ where: { email: params.email } });

  if (!user) return { errors: { email: "Email/Password combo not found" } };

  if (await verifyPassword(user.password, params.password)) {
    user.password = "";

    return { data: user };
  }

  return { errors: { email: "Email/Password combo not found" } };
}
