import type {
  DataFunctionArgs,
  SerializeFrom,
  V2_MetaFunction,
} from "@remix-run/node";
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

export const meta: V2_MetaFunction = () => [
  {
    title: "Remix Prisma Starter",
  },
  {
    description: "Welcome to remix!",
  },
];

export default function ProfilePage() {
  return <Profile />;
}
