import { createContext, ReactNode, useContext } from "react";
import { AuthedRouteData } from "~/routes/__authed";

const UserContext = createContext<AuthedRouteData["user"]>(
  undefined as unknown as AuthedRouteData["user"]
);

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: AuthedRouteData["user"];
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function useUser() {
  return useContext(UserContext);
}
