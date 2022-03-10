import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { redirect } from "remix";
import { login, LoginParams } from "~/data/auth.server";
import Login from "~/modules/Login";
import { authenticate, userFromRequest } from "~/web/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/app/notes");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = Object.fromEntries(await request.formData());
  const result = await login(form as LoginParams);

  if (result.errors) return result.errors;

  return authenticate(result.data, form.redirectUrl as string);
};

export const meta: MetaFunction = () => ({
  title: "Remix Prisma Starter",
  description: "Welcome to remix!",
});

export default function LoginPage() {
  return <Login />;
}
