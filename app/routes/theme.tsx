import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { setTheme } from "~/web/theme.server";

export const action: ActionFunction = async ({ request }) => setTheme(request);

export const loader: LoaderFunction = () => redirect("/", { status: 404 });
