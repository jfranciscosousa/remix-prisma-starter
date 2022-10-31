import { ReactNode } from "react";
import { Form, NavLink } from "remix";
import { UserProvider } from "~/hooks/useUser";
import { AppRouteData } from "~/routes/app";

export default function LoggedInLayout({
  user,
  children,
}: {
  user: AppRouteData["user"];
  children: ReactNode;
}) {
  return (
    <UserProvider user={user}>
      <nav className="flex w-full justify-between mb-10">
        <p>Welcome, {user.name}!</p>

        <ul className="flex flex-row space-x-4 items-center">
          <li>
            <NavLink to="/app/notes">Notes</NavLink>
          </li>

          <li>
            <NavLink to="/app/profile">Profile</NavLink>
          </li>

          <li>
            <Form method="post" action="/logout">
              <button type="submit" className="btn btn-secondary">
                Logout
              </button>
            </Form>
          </li>
        </ul>
      </nav>

      {children}
    </UserProvider>
  );
}
