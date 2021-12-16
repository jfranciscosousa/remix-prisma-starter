import { ActionFunction } from "remix";
import { authCookie } from "~/web/cookies.server";

export const action: ActionFunction = async () =>
  new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
      "Set-Cookie": await authCookie.serialize({}),
    },
  });
