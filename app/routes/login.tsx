import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { redirect } from "remix";
import { login, LoginParams } from "~/data/auth.server";
import { authCookie } from "~/web/cookies.server";
import userFromRequest from "~/web/userFromRequest.server";
import Login from "~/modules/Login";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = Object.fromEntries(await request.formData());
  const result = await login(form as LoginParams);

  if (result.errors) return result.errors;

  return new Response(null, {
    status: 302,
    headers: {
      location: "/notes",
      "Set-Cookie": await authCookie.serialize({
        userId: result.data.id,
      }),
    },
  });
};

export const meta: MetaFunction = () => ({
  title: "Remix Prisma Starter",
  description: "Welcome to remix!",
});

export default function LoginPage() {
  return <Login />;
}
