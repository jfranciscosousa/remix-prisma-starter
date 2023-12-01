import type {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
  SerializeFrom,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import Login from "~/modules/Login";
import { authenticate, userFromRequest } from "~/web/auth.server";
import { login } from "~/data/users/login.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export type LoginActionType = SerializeFrom<typeof action>;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const original = Object.fromEntries(formData) as Record<string, string>;
  const result = await login(formData);

  if (result.errors) return { errors: result.errors, original };

  return authenticate(result.data, {
    redirectUrl: original.redirectUrl as string,
    rememberMe: result.data.rememberMe,
  }) as never;
};

export const meta: MetaFunction = () => [
  {
    title: "Login",
  },
];

export default function LoginPage() {
  return <Login />;
}
