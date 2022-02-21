import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { redirect } from "remix";
import { createUser } from "~/data/users.server";
import SignUp from "~/modules/SignUp";
import { authenticate, userFromRequest } from "~/web/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const result = await createUser({
    email: form.get("email") as string,
    name: form.get("name") as string,
    password: form.get("password") as string,
    passwordConfirmation: form.get("passwordConfirmation") as string,
  });

  if (result.errors) return result.errors;

  return authenticate(result.data);
};

export const meta: MetaFunction = () => ({
  title: "Remix Prisma Starter",
  description: "Welcome to remix!",
});

export default function SignUpPage() {
  return <SignUp />;
}
