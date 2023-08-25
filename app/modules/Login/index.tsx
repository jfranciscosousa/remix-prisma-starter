import { Form, Link, useActionData, useLocation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import { FullInput } from "~/components/ui/full-input";
import useIsLoading from "~/hooks/useIsLoading";

export default function Login() {
  const { errors, original } = useActionData() || {};
  const isLoading = useIsLoading();
  const location = useLocation();

  return (
    <Card className="max-w-lg w-full mx-auto flex items-center justify-center">
      <Form
        method="post"
        action="/login"
        className="p-10 w-full flex flex-col space-y-4"
      >
        <CardTitle className="mb-8">Please login</CardTitle>

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
    </Card>
  );
}
