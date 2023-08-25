import { useContext, useMemo } from "react";
import { CLIENT_ENV, ClientEnv } from "~/env";
import { UserContext } from "./useUser";
import { UserFeatureFlags } from "~/server/utils/userFeatureFlags.server";

export default function useFeatureFlags() {
  const userContext = useContext(UserContext);

  return useMemo(
    () => ({
      // Check the CLIENT_ENV object for feature flags
      hasGlobalFeatureFlag: (flag: keyof ClientEnv): boolean =>
        !!CLIENT_ENV[flag],
      // Check the current user feature flags. If there's no user, this returns false, always
      hasFeatureFlag: (flag: keyof UserFeatureFlags): boolean =>
        !!userContext?.featureFlags?.[flag],
    }),
    [userContext?.featureFlags],
  );
}
