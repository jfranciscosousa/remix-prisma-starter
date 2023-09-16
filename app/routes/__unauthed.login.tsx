import type {
  DataFunctionArgs,
  LoaderFunction,
  SerializeFrom,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import Login from "~/modules/Login";
import { authenticate, userFromRequest } from "~/server/auth.server";
import { LoginParams, login } from "~/server/users/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export type LoginActionDataType = SerializeFrom<typeof action>;

export const action = async ({ request }: DataFunctionArgs) => {
  const form = Object.fromEntries(await request.formData());
  const result = await login(form as LoginParams);

  if (result.errors) return { errors: result.errors, original: form };

  return authenticate(
    result.data,
    form.redirectUrl as string,
  ) as unknown as undefined;
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
