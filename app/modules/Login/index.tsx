import {
  Form,
  Link,
  useActionData,
  useLocation,
  useTransition,
} from "@remix-run/react";
import classNames from "classnames";
import FullInput from "~/components/FullInput";

export default function Login() {
  const { errors, original } = useActionData() || {};
  const { state, submission } = useTransition();
  const isLoading =
    (state === "submitting" || state === "loading") && !!submission;
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

        <button
          type="submit"
          className={classNames("btn btn-primary", {
            loading: isLoading,
          })}
          disabled={isLoading}
        >
          {!isLoading && "Login"}
        </button>

        <Link to="/signup" className="link text-center">
          Or sign up instead
        </Link>
      </Form>
    </div>
  );
}
