import { useRouteLoaderData } from "react-router";
import { AuthedRouteData } from "~/routes/__authed";

export function useOptionalUser(): AuthedRouteData["user"] | undefined {
  return useRouteLoaderData("routes/__authed")?.user;
}

export default function useUser(): NonNullable<AuthedRouteData["user"]> {
  return useRouteLoaderData("routes/__authed").user;
}
