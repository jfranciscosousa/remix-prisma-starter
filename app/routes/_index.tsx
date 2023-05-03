import { LoaderFunction, redirect } from "@remix-run/node";

export const config = { runtime: "edge" };

export const loader: LoaderFunction = async () => redirect("/notes");
