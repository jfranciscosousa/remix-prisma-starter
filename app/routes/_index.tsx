import { LoaderFunction, redirect } from "@remix-run/server-runtime";

export const loader: LoaderFunction = async () => redirect("/notes");
