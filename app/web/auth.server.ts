import { User } from "@prisma/client";
import { createCookie } from "@remix-run/node";
import CONFIG from "~/config";
import prisma from "~/data/utils/prisma.server";
import { getServerEnvVar } from "~/lib/env.server";

const authCookie = createCookie("auth", {
  secrets: [getServerEnvVar("SECRET_KEY_BASE")],
  sameSite: "lax",
  httpOnly: true,
  secure: CONFIG.secureAuthCookie,
  maxAge: 604_800, // one week,
});

export async function authenticate(user: { id: string }, redirectUrl = "/") {
  return new Response(null, {
    status: 302,
    headers: {
      location: redirectUrl,
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

  // We can assume this as we only expect a nil value as a edge case on /app parent route
  if (!userId) return null as unknown as User;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  return user as User;
}

export async function userIdFromRequest(request: Request): Promise<string> {
  const cookieHeader = request.headers.get("Cookie");
  const { userId } = (await authCookie.parse(cookieHeader)) || {};

  // We can assume this as we only expect a nil value as a edge case on /app parent route
  if (!userId) return undefined as unknown as string;

  return userId;
}
