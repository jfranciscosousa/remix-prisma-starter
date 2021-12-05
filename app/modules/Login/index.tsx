import classNames from "classnames";
import { Form, Link } from "remix";

interface LoginProps {
  error?: any;
  isLoading: boolean;
}

export default function Login({ error, isLoading }: LoginProps) {
  return (
    <div className="max-w-lg mx-auto h-full flex items-center justify-center">
      <Form
        method="post"
        className="p-10 card bg-base-200 w-full flex flex-col space-y-4"
      >
        <h1 className="text-xl text-center">Please login</h1>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="hello@email.com"
            className="input"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="**************"
            className="input"
          />
        </div>

        {error === "404" && (
          <p className="pt-4 text-red-500 text-center">User and password combination not found!</p>
        )}

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
