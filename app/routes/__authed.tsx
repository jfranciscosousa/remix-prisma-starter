import { LoaderFunctionArgs, redirect, SerializeFrom } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import ErrorPage from "~/components/Error500Page";
import LoggedInLayout from "~/components/layouts/LoggedInLayout";
import { userFromRequest } from "~/web/auth.server";

export type AuthedRouteData = SerializeFrom<Awaited<ReturnType<typeof loader>>>;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await userFromRequest(request);

  if (!user) {
    const url = new URL(request.url);
    const redirectTo = encodeURI(
      `${url.pathname}${url.search ? `?${url.search}` : ``}`,
    );

    throw redirect(`/login?redirectTo=${redirectTo}`);
  }

  return { user };
};

export function ErrorBoundary() {
  return <ErrorPage />;
}

export default function AppPage() {
  const { user } = useLoaderData<AuthedRouteData>();

  return (
    <LoggedInLayout user={user}>
      <Outlet />
    </LoggedInLayout>
  );
}
