import { LoaderFunction, redirect } from "remix";
import userFromRequest from "~/lib/web/userFromRequest.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (!user) return redirect("/login");
  return redirect("/notes");
};
