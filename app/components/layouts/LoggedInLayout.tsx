import { User } from "@prisma/client";
import { ReactNode } from "react";
import { NavLink } from "remix";

export default function LoggedInLayout({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  return (
    <div>
      <nav className="flex w-full justify-between mb-10">
        <p>Welcome, {user.name}!</p>

        <ul className="flex flex-row space-x-4 items-center">
          <li>
            <NavLink to="/notes">Notes</NavLink>
          </li>

          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>

          <li>
            <NavLink to="/logout" target="_blank" className="btn btn-secondary">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>

      {children}
    </div>
  );
}
