import { User } from "@prisma/client";
import { ReactNode } from "react";

export default function LoggedInLayout({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  return (
    <div>
      <nav className="flex w-full justify-between">
        <p>Welcome, {user.name}!</p>

        <form method="POST" action="/logout">
          <button className="btn btn-secondary">Logout</button>
        </form>
      </nav>

      {children}
    </div>
  );
}
