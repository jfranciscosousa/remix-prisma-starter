import { LoaderFunction } from "remix";
import { redirect } from "remix";
import userFromRequest from "~/lib/web/userFromRequest";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await userFromRequest(request);

  if (!user) return redirect("/login");
  else return redirect("/notes");
};
