import { User } from "@prisma/client";
import { createCookie, redirect } from "remix";
import prisma from "~/data/utils/prisma.server";

const authCookie = createCookie("auth", {
  secrets: [process.env.SECRET_KEY_BASE as string],
  sameSite: "lax",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 604_800, // one week,
});

export async function authenticate(user: User) {
  return new Response(null, {
    status: 302,
    headers: {
      location: "/notes",
      "Set-Cookie": await authCookie.serialize({
        userId: user.id,
      }),
    },
  });
}

export async function logout() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
      "Set-Cookie": await authCookie.serialize({}),
    },
  });
}

export async function userFromRequest(request: Request): Promise<User> {
  const cookieHeader = request.headers.get("Cookie");
  const { userId } = (await authCookie.parse(cookieHeader)) || {};

  if (!userId) throw redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw redirect("/login");

  return user;
}

export async function userIdFromRequest(request: Request): Promise<string> {
  const cookieHeader = request.headers.get("Cookie");
  const { userId } = (await authCookie.parse(cookieHeader)) || {};

  if (!userId) throw redirect("/login");

  return userId;
}
