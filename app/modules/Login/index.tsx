import classNames from "classnames";
import { Form, Link, useActionData, useLocation, useTransition } from "remix";

export default function Login() {
  const errors = useActionData() || {};
  const { state, submission } = useTransition();
  const isLoading =
    (state === "submitting" || state === "loading") && !!submission;
  const location = useLocation();

  return (
    <div className="max-w-lg mx-auto h-full flex items-center justify-center">
      <Form
        method="post"
        action="/login"
        className="p-10 card bg-base-200 w-full flex flex-col space-y-4"
      >
        <h1 className="text-xl text-center">Please login</h1>

        <div className="form-control">
          <label className="label" htmlFor="login-email">
            <span className="label-text">Email</span>
          </label>
          <input
            id="login-email"
            name="email"
            required
            placeholder="hello@email.com"
            className="input"
          />
          {errors.email && <p className="pt-4 text-red-500">{errors.email}</p>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="login-password">
            <span className="label-text">Password</span>
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            required
            placeholder="**************"
            className="input"
          />
          {errors.password && (
            <p className="pt-4 text-red-500">{errors.password}</p>
          )}
        </div>

        <input
          name="redirectUrl"
          type="hidden"
          defaultValue={location.pathname + location.search}
        />

        <div className="mt-4" />

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
