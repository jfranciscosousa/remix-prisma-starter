import { ActionFunction, LoaderFunction, redirect } from "@vercel/remix";
import { setTheme } from "~/server/theme.server";

export const action: ActionFunction = async ({ request }) => setTheme(request);

export const loader: LoaderFunction = () => redirect("/", { status: 404 });
