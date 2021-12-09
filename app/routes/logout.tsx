import { ActionFunction } from "remix";
import { authCookie } from "~/lib/web/cookies.server";

export const action: ActionFunction = async () =>
  new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
      "Set-Cookie": await authCookie.serialize({}),
    },
  });
