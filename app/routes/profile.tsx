import { User } from "@prisma/client";
import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import {
  useActionData,
  redirect,
  useTransition,
  useLoaderData,
  json,
} from "remix";
import { findUserByEmail, updateUser } from "~/lib/data/users.server";
import userFromRequest from "~/lib/web/userFromRequest.server";
import Profile from "~/modules/Profile";

type ProfileData = {
  user: User;
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await userFromRequest(request);

  if (!user) return redirect("/login");

  return json({ user });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (!user) return redirect("/login");

  const form = await request.formData();

  if (form.get("password") !== form.get("passwordConfirmation")) {
    return "Passwords do not match!";
  }

  await updateUser(user, {
    email: form.get("email") as string,
    name: form.get("name") as string,
    password: form.get("password") as string,
  });

  return redirect("/profile");
};

export let meta: MetaFunction = () => {
  return {
    title: "Remix Prisma Starter",
    description: "Welcome to remix!",
  };
};

export default function ProfilePage() {
  const { user } = useLoaderData<ProfileData>();
  const error = useActionData();
  const { state, submission } = useTransition();
  const isLoading =
    (state === "submitting" || state === "loading") && !!submission;

  return <Profile user={user} error={error} isLoading={isLoading} />;
}
