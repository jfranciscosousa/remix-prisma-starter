/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo } from "react";
import { CLIENT_ENV } from "~/env";
import { UserContext } from "./useUser";

type GLOBAL_FEATURE_FLAG = "EXAMPLE_GLOBAL_FEATURE_FLAG";
type FEATURE_FLAG = "EXAMPLE_FEATURE_FLAG";

export default function useFeatureFlags() {
  const userContext = useContext(UserContext);

  return useMemo(
    () => ({
      // Check the CLIENT_ENV object for feature flags
      hasGlobalFeatureFlag: (flag: GLOBAL_FEATURE_FLAG): boolean =>
        CLIENT_ENV[flag],
      // Check the current user feature flags. If there's no user, this returns false, always
      hasFeatureFlag: (flag: FEATURE_FLAG): boolean =>
        !!(userContext?.featureFlags as any)?.[flag],
    }),
    [userContext?.featureFlags]
  );
}
