import type { ActionFunction, LoaderFunction } from "remix";
import { Form, useActionData, redirect, Link } from "remix";
import { login } from "~/lib/data/auth.server";
import { authCookie } from "~/lib/web/cookies.server";
import userFromRequest from "~/lib/web/userFromRequest";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await userFromRequest(request);

  if (user) return redirect("/");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const user = await login({
    email: form.get("email") as string,
    password: form.get("password") as string,
  });

  if (!user) return "404";

  return new Response(null, {
    headers: {
      "Set-Cookie": await authCookie.serialize({
        userId: user.id,
      }),
    },
  });
};

export default function NewPost() {
  const error = useActionData();

  return (
    <div className="max-w-lg mx-auto">
      <Form
        method="post"
        className="p-10 card bg-base-200 flex flex-col space-y-4"
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

        {error === "404" && <p>User and password combination not found!</p>}

        <div className="mt-4" />

        <button type="submit" className="btn btn-primary block">
          Login
        </button>

        <Link to="/signup" className="link text-center">
          Or sign up instead
        </Link>
      </Form>
    </div>
  );
}
