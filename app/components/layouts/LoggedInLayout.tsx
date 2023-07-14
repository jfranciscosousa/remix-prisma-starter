import { Form, NavLink } from "@remix-run/react";
import { ReactNode } from "react";
import useFeatureFlags from "~/hooks/useFeatureFlags";
import { UserProvider } from "~/hooks/useUser";
import { AuthedRouteData } from "~/routes/__authed";
import Button from "../Button";

function InnerLoggedInLayout({
  user,
  children,
}: {
  user: NonNullable<AuthedRouteData["user"]>;
  children: ReactNode;
}) {
  const { hasFeatureFlag } = useFeatureFlags();

  return (
    <div className="flex flex-col h-screen w-full">
      <nav className="max-w-6xl mx-auto flex w-full justify-between shrink-0 py-8">
        {hasFeatureFlag("EXAMPLE_FEATURE_FLAG") ? (
          <p>Special welcome, {user.name}!</p>
        ) : (
          <p>Welcome, {user.name}!</p>
        )}

        <ul className="flex flex-row space-x-4 items-center">
          <li>
            <NavLink to="/notes" prefetch="intent">
              Notes
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" prefetch="intent">
              Profile
            </NavLink>
          </li>

          <li>
            <Form method="post" action="/logout">
              <Button type="submit" variant="secondary">
                Logout
              </Button>
            </Form>
          </li>
        </ul>
      </nav>

      <div className="contents">{children}</div>
    </div>
  );
}

export default function LoggedInLayout({
  user,
  children,
}: {
  user: NonNullable<AuthedRouteData["user"]>;
  children: ReactNode;
}) {
  return (
    <UserProvider user={user}>
      <InnerLoggedInLayout user={user}>{children}</InnerLoggedInLayout>
    </UserProvider>
  );
}
