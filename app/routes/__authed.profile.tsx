import type {
  DataFunctionArgs,
  SerializeFrom,
  V2_MetaFunction,
} from "@vercel/remix";
import { updateUser, UpdateUserParams } from "~/data/users.server";
import Profile from "~/modules/Profile";
import { userIdFromRequest } from "~/web/auth.server";

export type ProfileRouteAction = SerializeFrom<typeof action>;

export const action = async ({ request }: DataFunctionArgs) => {
  const userId = await userIdFromRequest(request);
  const form = Object.fromEntries(await request.formData());

  const { errors } = await updateUser(userId, form as UpdateUserParams);

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
