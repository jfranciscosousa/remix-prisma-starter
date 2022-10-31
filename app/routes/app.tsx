import { DataFunctionArgs, SerializeFrom } from "@remix-run/server-runtime";
import { Outlet, useLoaderData } from "remix";
import LoggedInLayout from "~/components/layouts/LoggedInLayout";
import Login from "~/modules/Login";
import { userFromRequest } from "~/web/auth.server";

export type AppRouteData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const user = await userFromRequest(request);

  return { user };
};

export default function AppPage() {
  const { user } = useLoaderData<AppRouteData>();

  if (!user) return <Login />;

  return (
    <LoggedInLayout user={user}>
      <Outlet />
    </LoggedInLayout>
  );
}
