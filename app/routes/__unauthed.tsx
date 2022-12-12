import { Outlet } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import LoggedOutLayout from "~/components/layouts/LoggedOutLayout";
import { userFromRequest } from "~/web/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export default function UnauthedLayout() {
  return (
    <LoggedOutLayout>
      <Outlet />
    </LoggedOutLayout>
  );
}