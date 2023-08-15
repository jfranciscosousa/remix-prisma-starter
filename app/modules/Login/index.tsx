import { Form, Link, useActionData, useLocation } from "@remix-run/react";
import Button from "~/components/Button";
import FullInput from "~/components/FullInput";
import useIsLoading from "~/hooks/useIsLoading";

export default function Login() {
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
