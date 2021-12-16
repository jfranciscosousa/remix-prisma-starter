import { User } from "@prisma/client";
import prisma from "~/data/prisma.server";
import { authCookie } from "./cookies.server";

export default async function userFromRequest(
  request: Request
): Promise<User | undefined | null> {
  const cookieHeader = request.headers.get("Cookie");
  const { userId } = (await authCookie.parse(cookieHeader)) || {};

  if (!userId) return;

  return prisma.user.findUnique({ where: { id: userId } });
}
