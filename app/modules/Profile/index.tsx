import { User } from "@prisma/client";
import classNames from "classnames";
import { Form } from "remix";
import LoggedInLayout from "~/components/layouts/LoggedInLayout";

interface SignUpProps {
  user: User;
  error?: string;
  isLoading: boolean;
}

export default function Profile({ user, error, isLoading }: SignUpProps) {
  return (
    <LoggedInLayout user={user}>
      <div className="max-w-lg mx-auto h-full flex items-center justify-center">
        <Form
          method="post"
          className="p-10 card bg-base-200 w-full flex flex-col space-y-4"
        >
          <h1 className="text-xl text-center">Edit your profile</h1>

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
              defaultValue={user.email}
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
              defaultValue={user.name}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="**************"
              className="input"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm password</span>
            </label>
            <input
              name="passwordConfirmation"
              type="password"
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
            {!isLoading && "Update profile"}
          </button>
        </Form>
      </div>
    </LoggedInLayout>
  );
}
