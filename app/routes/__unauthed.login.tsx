import type { MetaFunction } from "@remix-run/node";
import {
  redirect,
  unstable_defineAction,
  unstable_defineLoader,
} from "@remix-run/node";
import { login } from "~/data/users/login.server";
import Login from "~/modules/Login";
import { authenticate, userFromRequest } from "~/web/auth.server";

export const loader = unstable_defineLoader(async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
});

export type LoginActionType = typeof action;

export const action = unstable_defineAction(async ({ request }) => {
  const formData = await request.formData();
  const original = Object.fromEntries(formData) as Record<string, string>;
  const result = await login(formData);

  if (result.errors) return { errors: result.errors, original };

  return authenticate(result.data, {
    redirectUrl: original.redirectUrl as string,
    rememberMe: result.data.rememberMe,
  }) as never;
});

export const meta: MetaFunction = () => [
  {
    title: "Login",
  },
];

export default function LoginPage() {
  return <Login />;
}
