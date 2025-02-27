import { ReactNode } from "react";
import { Form, NavLink } from "react-router";
import useFeatureFlags from "~/env/useFeatureFlags";
import useIsLoading from "~/hooks/useIsLoading";
import ThemeChanger from "../ThemeChanger";
import { Button } from "../ui/button";
import useUser from "~/hooks/useUser";

export default function LoggedInLayout({ children }: { children: ReactNode }) {
  const user = useUser();
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
