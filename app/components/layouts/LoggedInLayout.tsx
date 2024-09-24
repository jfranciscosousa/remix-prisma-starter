import { Form, NavLink } from "@remix-run/react";
import { ReactNode } from "react";
import { UserProvider } from "~/hooks/useUser";
import { AuthedRouteData } from "~/routes/__authed";
import { Button } from "../ui/button";
import ThemeChanger from "../ThemeChanger";
import useIsLoading from "~/hooks/useIsLoading";
import { Toaster } from "../ui/toaster";
import useFeatureFlags from "~/env/useFeatureFlags";

function InnerLoggedInLayout({
  user,
  children,
}: {
  user: NonNullable<AuthedRouteData["user"]>;
  children: ReactNode;
}) {
  const { hasUserFeatureFlag } = useFeatureFlags();
  const isLoading = useIsLoading({ action: "/logout" });

  return (
    <div className="flex h-screen w-full flex-col px-12">
      <nav className="mx-auto flex w-full max-w-6xl shrink-0 justify-between py-8">
        {hasUserFeatureFlag("EXAMPLE_FEATURE_FLAG") ? (
          <p>Special welcome, {user.name}!</p>
        ) : (
          <p>Welcome, {user.name}!</p>
        )}

        <ul className="flex flex-row items-center space-x-4">
          <li>
            <NavLink
              to="/notes"
              prefetch="intent"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Notes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              prefetch="intent"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Profile
            </NavLink>
          </li>

          <li>
            <Form method="post" action="/logout">
              <Button type="submit" variant="destructive" disabled={isLoading}>
                Logout
              </Button>
            </Form>
          </li>

          <li>
            <ThemeChanger />
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
      <Toaster />
      <InnerLoggedInLayout user={user}>{children}</InnerLoggedInLayout>
    </UserProvider>
  );
}
