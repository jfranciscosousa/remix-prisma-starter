import { createContext, ReactNode, useContext } from "react";
import { AppRouteData } from "~/routes/app";

const UserContext = createContext<AppRouteData["user"]>(
  undefined as unknown as AppRouteData["user"]
);

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: AppRouteData["user"];
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function useUser() {
  return useContext(UserContext);
}
