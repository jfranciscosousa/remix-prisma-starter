import { ActionFunction, LoaderFunction, redirect } from "@vercel/remix";
import { logout } from "~/server/auth.server";

export const action: ActionFunction = async () => logout();

export const loader: LoaderFunction = () => redirect("/", { status: 404 });
