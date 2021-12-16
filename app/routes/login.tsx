import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { useActionData, redirect, useTransition } from "remix";
import { login } from "~/data/auth.server";
import { authCookie } from "~/web/cookies.server";
import userFromRequest from "~/web/userFromRequest.server";
import Login from "~/modules/Login";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const user = await login({
    email: form.get("email") as string,
    password: form.get("password") as string,
  });

  if (!user) return "404";

  return new Response(null, {
    status: 302,
    headers: {
      location: "/notes",
      "Set-Cookie": await authCookie.serialize({
        userId: user.id,
      }),
    },
  });
};

export const meta: MetaFunction = () => ({
  title: "Remix Prisma Starter",
  description: "Welcome to remix!",
});

export default function LoginPage() {
  const error = useActionData();
  const { state, submission } = useTransition();
  const isLoading =
    (state === "submitting" || state === "loading") && !!submission;

  return <Login error={error} isLoading={isLoading} />;
}
