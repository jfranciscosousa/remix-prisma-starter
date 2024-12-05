import { useRouteLoaderData } from "react-router";
import { Route } from "../+types/root";

export type RootLoaderType = Route.ComponentProps["loaderData"];

export function useRootLoaderData() {
  return useRouteLoaderData<RootLoaderType>("root")!;
}
