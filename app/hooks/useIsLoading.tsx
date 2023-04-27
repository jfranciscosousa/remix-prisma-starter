import { useNavigation } from "@remix-run/react";

export default function useIsLoading() {
  const navigation = useNavigation();

  return navigation.state !== "idle";
}
