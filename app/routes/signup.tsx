import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { Form, Link, useActionData, redirect } from "remix";
import { createUser } from "~/lib/data/users.server";
import { authCookie } from "~/lib/web/cookies.server";
import userFromRequest from "~/lib/web/userFromRequest";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await userFromRequest(request);

  if (user) return redirect("/");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const user = await createUser({
    email: form.get("email") as string,
    name: form.get("name") as string,
    password: form.get("password") as string,
  });

  if (!user) return "404";

  return new Response(null, {
    status: 302,
    headers: {
      location: "/",
      "Set-Cookie": await authCookie.serialize({
        userId: user.id,
      }),
    },
  });
};

export let meta: MetaFunction = () => {
  return {
    title: "Remix Prisma Starter",
    description: "Welcome to remix!",
  };
};

export default function NewPost() {
  const error = useActionData();

  return (
    <div className="max-w-lg mx-auto">
      <Form
        method="post"
        className="p-10 card bg-base-200 flex flex-col space-y-4"
      >
        <h1 className="text-xl text-center">Please sign up</h1>

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
            <span className="label-text">Name</span>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="How you would like to be called"
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
          Sign up
        </button>

        <Link to="/login" className="link text-center">
          Or login instead
        </Link>
      </Form>
    </div>
  );
}
