import { LoaderFunction, redirect } from "remix";
import { userFromRequest } from "~/web/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (!user) return redirect("/login");
  return redirect("/app/notes");
};
