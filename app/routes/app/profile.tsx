import type { ActionFunction, MetaFunction } from "remix";
import { redirect } from "remix";
import { updateUser, UpdateUserParams } from "~/data/users.server";
import Profile from "~/modules/Profile";
import { userFromRequest } from "~/web/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const user = await userFromRequest(request);
  const form = Object.fromEntries(await request.formData());

  const { errors } = await updateUser(user, form as UpdateUserParams);

  if (errors) return errors;

  return redirect("/app/profile");
};

export const meta: MetaFunction = () => ({
  title: "Remix Prisma Starter",
  description: "Welcome to remix!",
});

export default function ProfilePage() {
  return <Profile />;
}
