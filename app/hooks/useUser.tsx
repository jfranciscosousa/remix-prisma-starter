import { createContext, ReactNode, useContext } from "react";
import { AuthedRouteData } from "~/routes/__authed";

export const UserContext = createContext<AuthedRouteData["user"] | null>(null);

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: NonNullable<AuthedRouteData["user"]>;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function useUser(): NonNullable<AuthedRouteData["user"]> {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>",
    );
  }

  return userContext;
}
