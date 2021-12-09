import classNames from "classnames";
import { Form, Link } from "remix";

interface SignUpProps {
  error?: string;
  isLoading: boolean;
}

export default function SignUp({ error, isLoading }: SignUpProps) {
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
            type="email"
            required
            placeholder="hello@email.com"
            className="input"
          />
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
        </div>

        {error && <p className="pt-4 text-red-500 text-center">{error}</p>}

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
