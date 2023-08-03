import { Form, Link, useActionData, useLocation } from "@remix-run/react";
import type {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
} from "@vercel/remix";
import { redirect } from "@vercel/remix";
import Button from "~/components/Button";
import FullInput from "~/components/FullInput";
import { LoginParams, login } from "~/data/users/auth.server";
import useIsLoading from "~/hooks/useIsLoading";
import { authenticate, userFromRequest } from "~/web/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = Object.fromEntries(await request.formData());
  const result = await login(form as LoginParams);

  if (result.errors) return { errors: result.errors, original: form };

  return authenticate(result.data, form.redirectUrl as string);
};

export const meta: V2_MetaFunction = () => [
  {
    title: "Remix Prisma Starter",
  },
  {
    description: "Welcome to remix!",
  },
];

export default function LoginPage() {
  const { errors, original } = useActionData() || {};
  const isLoading = useIsLoading();
  const location = useLocation();

  return (
    <div className="max-w-lg w-full mx-auto h-full flex items-center justify-center">
      <Form
        method="post"
        action="/login"
        className="p-10 card bg-base-200 w-full flex flex-col space-y-4"
      >
        <h1 className="text-xl text-center">Please login</h1>

        <FullInput
          label="Email"
          name="email"
          type="text"
          required
          placeholder="hello@email.com"
          errors={errors}
          defaultValue={original?.email}
        />

        <FullInput
          label="Password"
          name="password"
          type="password"
          placeholder="**************"
          required
          errors={errors}
          defaultValue={original?.password}
          className="pb-4"
        />

        <input
          name="redirectUrl"
          type="hidden"
          defaultValue={location.pathname + location.search}
        />

        <Button type="submit" isLoading={isLoading}>
          Login
        </Button>

        <Link to="/signup" className="link text-center">
          Or sign up instead
        </Link>
      </Form>
    </div>
  );
}
