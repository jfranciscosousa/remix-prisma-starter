import { LoaderFunction } from "remix";
import { authCookie } from "~/lib/web/cookies.server";

export const loader: LoaderFunction = async () =>
  new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
      "Set-Cookie": await authCookie.serialize({}),
    },
  });
