import type { MetaFunction } from "@remix-run/node";
import { unstable_defineAction, unstable_defineLoader } from "@remix-run/node";
import { login } from "~/data/users/login.server";
import Login from "~/modules/Auth/Login";
import { authenticate } from "~/web/auth.server";

export type LoginLoaderType = typeof loader;

export const loader = unstable_defineLoader(async ({ request }) => ({
  redirectTo: new URL(request.url).searchParams.get("redirectTo"),
}));

export type LoginActionType = typeof action;

export const action = unstable_defineAction(async ({ request }) => {
  const formData = await request.formData();
  const original = Object.fromEntries(formData) as Record<string, string>;
  const result = await login(formData);

  if (result.errors) return { errors: result.errors, original };

  return authenticate(result.data, {
    redirectTo: result.data.redirectTo,
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
