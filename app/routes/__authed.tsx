import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import ErrorPage from "~/components/Error500Page";
import LoggedInLayout from "~/components/layouts/LoggedInLayout";
import LoggedOutLayout from "~/components/layouts/LoggedOutLayout";
import Login from "~/modules/Login";
import { userFromRequest } from "~/web/auth.server";

export type AuthedRouteData = Awaited<ReturnType<typeof loader>>;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await userFromRequest(request);

  return { user };
};

export function ErrorBoundary() {
  return <ErrorPage />;
}

export default function AppPage() {
  const { user } = useLoaderData<AuthedRouteData>();

  if (!user)
    return (
      <LoggedOutLayout>
        <Login />
      </LoggedOutLayout>
    );

  return (
    <LoggedInLayout user={user}>
      <Outlet />
    </LoggedInLayout>
  );
}
