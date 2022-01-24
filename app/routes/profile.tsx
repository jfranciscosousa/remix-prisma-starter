import { User } from "@prisma/client";
import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { redirect, json } from "remix";
import { updateUser, UpdateUserParams } from "~/data/users.server";
import userFromRequest from "~/web/userFromRequest.server";
import Profile from "~/modules/Profile";

export interface ProfileRouteData {
  user: User;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (!user) return redirect("/login");

  return json({ user });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (!user) return redirect("/login");

  const form = Object.fromEntries(await request.formData());

  if (form.newPassword !== form.passwordConfirmation) {
    return { passwordConfirmation: "Passwords do not match!" };
  }

  const { errors } = await updateUser(user, form as UpdateUserParams);

  if (errors) return errors;

  return redirect("/profile");
};

export const meta: MetaFunction = () => ({
  title: "Remix Prisma Starter",
  description: "Welcome to remix!",
});

export default function ProfilePage() {
  return <Profile />;
}
