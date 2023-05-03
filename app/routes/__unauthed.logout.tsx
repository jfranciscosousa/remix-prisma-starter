import { ActionFunction } from "@remix-run/node";
import { logout } from "~/web/auth.server";

export const config = { runtime: "edge" };

export const action: ActionFunction = async () => logout();
