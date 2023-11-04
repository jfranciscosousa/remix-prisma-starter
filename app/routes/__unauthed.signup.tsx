import { Form, Link, useActionData } from "@remix-run/react";
import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { FullInput } from "~/components/ui/full-input";
import { createUser } from "~/data/users.server";
import { GenericDataError } from "~/data/utils/types";
import useIsLoading from "~/hooks/useIsLoading";
import { authenticate, userFromRequest } from "~/web/auth.server";
import { Card, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";

export const loader = async ({ request }: DataFunctionArgs) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
};

export const action = async ({ request }: DataFunctionArgs) => {
  const form = await request.formData();
  const result = await createUser(form);

  if (result.errors) return result.errors;

  return authenticate(result.data, { rememberMe: result.data.rememberMe });
};

export const meta: MetaFunction = () => [
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
    <Card className="max-w-lg w-full mx-auto flex items-center justify-center">
      <Form
        method="post"
        action="/signup"
        className="p-10 w-full flex flex-col space-y-4"
      >
        <CardTitle className="mb-8">Please sign up</CardTitle>

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
        />

        <div className="items-top flex space-x-2 pb-4">
          <Checkbox id="rememberMe" name="rememberMe" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
        </div>

        <Button type="submit" className="mt-8" isLoading={isLoading}>
          Sign up
        </Button>

        <Link to="/login" className="link text-center">
          Or login instead
        </Link>
      </Form>
    </Card>
  );
}
