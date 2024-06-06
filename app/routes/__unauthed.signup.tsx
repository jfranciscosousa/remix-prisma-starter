import type { MetaFunction } from "@remix-run/node";
import {
  redirect,
  unstable_defineAction,
  unstable_defineLoader,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import { CheckboxField } from "~/components/ui/checkbox-field";
import { InputField } from "~/components/ui/input-field";
import { createUser } from "~/data/users.server";
import { GenericDataError } from "~/data/utils/types";
import useIsLoading from "~/hooks/useIsLoading";
import { authenticate, userFromRequest } from "~/web/auth.server";

export const loader = unstable_defineLoader(async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
});

export const action = unstable_defineAction(async ({ request }) => {
  const form = await request.formData();
  const result = await createUser(form);

  if (result.errors) return result.errors;

  return authenticate(result.data, { rememberMe: result.data.rememberMe });
});

export const meta: MetaFunction = () => [
  {
    title: "Sign up",
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

        <InputField
          label="Email"
          name="email"
          type="text"
          required
          placeholder="hello@email.com"
          errors={errors}
        />

        <InputField
          label="Name"
          name="name"
          type="text"
          required
          placeholder="How you would like to be called"
          errors={errors}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="**************"
          required
          errors={errors}
        />

        <InputField
          label="Confirm password"
          name="passwordConfirmation"
          type="password"
          placeholder="**************"
          required
          errors={errors}
        />

        <CheckboxField name="rememberMe" label="Remember me" className="pb-4" />

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
