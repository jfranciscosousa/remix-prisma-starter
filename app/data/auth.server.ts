import { User } from "@prisma/client";
import prisma from "./utils/prisma.server";
import { verifyPassword } from "./passwordUtils.server";
import { DataResult } from "./utils/types";
import errorsFromSchema from "./validate.server";
import { InferType, object, string } from "yup";

const loginParams = object({
  email: string().email().required(),
  password: string().required(),
});

export type LoginParams = InferType<typeof loginParams>;

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
