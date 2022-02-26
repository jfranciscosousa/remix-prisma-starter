import { User } from "@prisma/client";
import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext<User>(undefined as unknown as User);

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function useUser() {
  return useContext(UserContext);
}
