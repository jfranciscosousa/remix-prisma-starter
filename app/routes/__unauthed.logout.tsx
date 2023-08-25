import { ActionFunction } from "@vercel/remix";
import { logout } from "~/server/auth.server";

export const action: ActionFunction = async () => logout();
