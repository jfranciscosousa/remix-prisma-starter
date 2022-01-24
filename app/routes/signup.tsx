import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { redirect } from "remix";
import { createUser, findUserByEmail } from "~/data/users.server";
import { authCookie } from "~/web/cookies.server";
import userFromRequest from "~/web/userFromRequest.server";
import SignUp from "~/modules/SignUp";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  if (await findUserByEmail(form.get("email") as string)) {
    return { email: "User already exists!" };
  }

  if (form.get("password") !== form.get("passwordConfirmation")) {
    return { passwordConfirmation: "Passwords do not match!" };
  }

  const result = await createUser({
    email: form.get("email") as string,
    name: form.get("name") as string,
    password: form.get("password") as string,
  });

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

export default function SignUpPage() {
  return <SignUp />;
}
