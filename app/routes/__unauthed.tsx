import { LoaderFunction, Outlet, redirect } from "remix";
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
