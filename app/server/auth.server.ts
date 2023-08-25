import { createCookie, redirect } from "@vercel/remix";
import prisma from "~/server/utils/prisma.server";
import { SERVER_ENV } from "~/env.server";

const authCookie = createCookie("auth", {
  secrets: [SERVER_ENV.SECRET_KEY_BASE],
  sameSite: "lax",
  httpOnly: true,
  secure: SERVER_ENV.SECURE_AUTH_COOKIE,
  maxAge: 604_800, // one week,
});

export async function authenticate(user: { id: string }, redirectUrl = "/") {
  return redirect(redirectUrl, {
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

export async function userIdFromRequest(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const { userId } = (await authCookie.parse(cookieHeader)) || {};

  return userId;
}

export async function userFromRequest(request: Request) {
  const userId = await userIdFromRequest(request);

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      featureFlags: true,
    },
  });

  return user;
}
