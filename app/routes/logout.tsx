import { LoaderFunction } from "remix";
import { authCookie } from "~/lib/web/cookies.server";

export let loader: LoaderFunction = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
      "Set-Cookie": await authCookie.serialize({}),
    },
  });
};
