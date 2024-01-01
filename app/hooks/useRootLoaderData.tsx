import { useRouteLoaderData } from "@remix-run/react";
import { loader } from "~/root";

export type RootLoaderType = Awaited<ReturnType<typeof loader>>;

export function useRootLoaderData(): RootLoaderType {
  return useRouteLoaderData("root")!;
}
