import { Form, Link, useActionData, useLocation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { FullInput } from "~/components/ui/full-input";
import useIsLoading from "~/hooks/useIsLoading";
import { LoginActionType } from "~/routes/__unauthed.login";

export default function Login() {
  const actionData = useActionData<LoginActionType>();
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
          errors={actionData?.errors}
          defaultValue={actionData?.original?.email}
        />

        <FullInput
          label="Password"
          name="password"
          type="password"
          placeholder="**************"
          required
          errors={actionData?.errors}
          defaultValue={actionData?.original?.password}
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
