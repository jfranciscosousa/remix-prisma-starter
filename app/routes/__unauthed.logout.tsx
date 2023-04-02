import { ActionFunction } from "@remix-run/server-runtime";
import { logout } from "~/web/auth.server";

export const action: ActionFunction = async () => logout();
