import type { ActionFunction, MetaFunction } from "remix";
import { redirect } from "remix";
import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { updateUser, UpdateUserParams } from "~/data/users.server";
import userFromRequest from "~/web/userFromRequest.server";
import Profile from "~/modules/Profile";

export type ProfileRouteData = Awaited<ReturnType<typeof loader>>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const user = await userFromRequest(request);

  if (!user) throw redirect("/login");

  return { user };
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
