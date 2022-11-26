import type {
  DataFunctionArgs,
  SerializeFrom,
} from "@remix-run/server-runtime";
import type { MetaFunction } from "remix";
import { updateUser, UpdateUserParams } from "~/data/users.server";
import Profile from "~/modules/Profile";
import { userFromRequest } from "~/web/auth.server";

export type ProfileRouteAction = SerializeFrom<typeof action>;

export const action = async ({ request }: DataFunctionArgs) => {
  const user = await userFromRequest(request);
  const form = Object.fromEntries(await request.formData());

  const { errors } = await updateUser(user, form as UpdateUserParams);

  if (errors) return { errors, success: false };

  return { errors: null, success: true };
};

export const meta: MetaFunction = () => ({
  title: "Remix Prisma Starter",
  description: "Welcome to remix!",
});

export default function ProfilePage() {
  return <Profile />;
}
