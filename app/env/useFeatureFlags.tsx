import { useMemo } from "react";

import { useOptionalUser } from "../hooks/useUser";
import { GLOBAL_ENV, GlobalEnv } from "./globalEnv";
import { UserFeatureFlags } from "./userFeatureFlags.server";

export default function useFeatureFlags() {
  const user = useOptionalUser();

  return useMemo(
    () => ({
      // Check the CLIENT_ENV object for feature flags
      hasGlobalFeatureFlag: (flag: keyof GlobalEnv): boolean =>
        !!GLOBAL_ENV[flag],
      // Get a value from CLIENT_ENV object
      getGlobalFeatureFlag: <T extends keyof GlobalEnv>(
        flag: T,
      ): GlobalEnv[T] => GLOBAL_ENV[flag],
      // Check the current user feature flags. If there's no user, this returns false, always
      hasUserFeatureFlag: (flag: keyof UserFeatureFlags): boolean =>
        !!user?.featureFlags?.[flag],
      // Get the current user feature flag value. If there's no user, this returns undefined, always
      getUserFeatureFlag: <T extends keyof UserFeatureFlags>(
        flag: T,
      ): UserFeatureFlags[T] | undefined => user?.featureFlags?.[flag],
    }),
    [user?.featureFlags],
  );
}
