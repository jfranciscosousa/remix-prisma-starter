import { Form, Link, useActionData } from "@remix-run/react";
import type { DataFunctionArgs, V2_MetaFunction } from "@vercel/remix";
import { redirect } from "@vercel/remix";
import Button from "~/components/Button";
import FullInput from "~/components/FullInput";
import { createUser } from "~/data/users/users.server";
import { GenericDataError } from "~/data/utils/types";
import useIsLoading from "~/hooks/useIsLoading";
import { authenticate, userFromRequest } from "~/web/auth.server";

export const loader = async ({ request }: DataFunctionArgs) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export const action = async ({ request }: DataFunctionArgs) => {
  const form = await request.formData();
  const result = await createUser({
    email: form.get("email") as string,
    name: form.get("name") as string,
    password: form.get("password") as string,
    passwordConfirmation: form.get("passwordConfirmation") as string,
  });

  if (result.errors) return result.errors;

  return authenticate(result.data);
};

export const meta: V2_MetaFunction = () => [
  {
    title: "Remix Prisma Starter",
  },
  {
    description: "Welcome to remix!",
  },
];

export default function SignUp() {
  const errors = useActionData<GenericDataError>();
  const isLoading = useIsLoading();

  return (
    <div className="max-w-lg w-full mx-auto h-full flex items-center justify-center">
      <Form
        method="post"
        action="/signup"
        className="p-10 card bg-base-200 w-full flex flex-col space-y-4"
      >
        <h1 className="text-xl text-center">Please sign up</h1>

        <FullInput
          label="Email"
          name="email"
          type="text"
          required
          placeholder="hello@email.com"
          errors={errors}
        />

        <FullInput
          label="Name"
          name="name"
          type="text"
          required
          placeholder="How you would like to be called"
          errors={errors}
        />

        <FullInput
          label="Password"
          name="password"
          type="password"
          placeholder="**************"
          required
          errors={errors}
        />

        <FullInput
          label="Confirm password"
          name="passwordConfirmation"
          type="password"
          placeholder="**************"
          required
          errors={errors}
          className="pb-4"
        />

        <Button type="submit" className="mt-8" isLoading={isLoading}>
          Sign up
        </Button>

        <Link to="/login" className="link text-center">
          Or login instead
        </Link>
      </Form>
    </div>
  );
}
