import { User } from "@prisma/client";
import prisma from "./prisma.server";
import { verifyPassword } from "./passwordUtils.server";

export interface LoginParams {
  email: string;
  password: string;
}

// eslint-disable-next-line import/prefer-default-export
export async function login(params: LoginParams): Promise<User | undefined> {
  const user = await prisma.user.findUnique({ where: { email: params.email } });

  if (!user) return;

  if (await verifyPassword(user.password, params.password)) {
    user.password = "";

    return user;
  }
}
