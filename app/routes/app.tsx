import { DataFunctionArgs } from "@remix-run/server-runtime";
import { Outlet, redirect, useLoaderData } from "remix";
import LoggedInLayout from "~/components/layouts/LoggedInLayout";
import { userFromRequest } from "~/web/auth.server";

export type AppRouteData = Awaited<ReturnType<typeof loader>>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const user = await userFromRequest(request);

  if (!user) throw redirect("/login");

  return { user };
};

export default function AppPage() {
  const { user } = useLoaderData<AppRouteData>();

  return (
    <LoggedInLayout user={user}>
      <Outlet />
    </LoggedInLayout>
  );
}
