import { LoaderFunction, redirect } from "@vercel/remix";

export const loader: LoaderFunction = async () => redirect("/notes");
