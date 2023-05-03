import { ActionFunction } from "@vercel/remix";
import { logout } from "~/web/auth.server";

export const action: ActionFunction = async () => logout();
