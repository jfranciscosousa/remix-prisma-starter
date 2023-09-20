import type {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
  SerializeFrom,
} from "@vercel/remix";
import { redirect } from "@vercel/remix";
import { login, LoginParams } from "~/server/users/auth.server";
import Login from "~/modules/Login";
import { authenticate, userFromRequest } from "~/server/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export type LoginActionType = SerializeFrom<typeof action>;

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = Object.fromEntries(await request.formData()) as Record<
    string,
    string
  >;
  const result = await login(form as LoginParams);

  if (result.errors) return { errors: result.errors, original: form };

  return authenticate(result.data, form.redirectUrl as string) as never;
};

export const meta: MetaFunction = () => [
  {
    title: "Remix Prisma Starter",
  },
  {
    description: "Welcome to remix!",
  },
];

export default function LoginPage() {
  return <Login />;
}
