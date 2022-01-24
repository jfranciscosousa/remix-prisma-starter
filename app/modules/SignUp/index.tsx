import classNames from "classnames";
import { Form, Link, useActionData, useTransition } from "remix";

export default function SignUp() {
  const errors = useActionData() || {};
  const { state, submission } = useTransition();
  const isLoading =
    (state === "submitting" || state === "loading") && !!submission;

  return (
    <div className="max-w-lg mx-auto h-full flex items-center justify-center">
      <Form
        method="post"
        className="p-10 card bg-base-200 w-full flex flex-col space-y-4"
      >
        <h1 className="text-xl text-center">Please sign up</h1>

        <div className="form-control">
          <label className="label" htmlFor="signup-email">
            <span className="label-text">Email</span>
          </label>
          <input
            id="signup-email"
            name="email"
            required
            placeholder="hello@email.com"
            className="input"
          />
          {errors.email && <p className="pt-4 text-red-500">{errors.email}</p>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="signup-name">
            <span className="label-text">Name</span>
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            required
            placeholder="How you would like to be called"
            className="input"
          />
          {errors.name && <p className="pt-4 text-red-500">{errors.name}</p>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="signup-password">
            <span className="label-text">Password</span>
          </label>
          <input
            id="signup-password"
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

        <div className="form-control">
          <label className="label" htmlFor="signup-passwordConfirmation">
            <span className="label-text">Confirm password</span>
          </label>
          <input
            id="signup-passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            required
            placeholder="**************"
            className="input"
          />
          {errors.passwordConfirmation && (
            <p className="pt-4 text-red-500">{errors.passwordConfirmation}</p>
          )}
        </div>

        <div className="mt-4" />

        <button
          type="submit"
          className={classNames("btn btn-primary", {
            loading: isLoading,
          })}
          disabled={isLoading}
        >
          {!isLoading && "Sign up"}
        </button>

        <Link to="/login" className="link text-center">
          Or login instead
        </Link>
      </Form>
    </div>
  );
}
