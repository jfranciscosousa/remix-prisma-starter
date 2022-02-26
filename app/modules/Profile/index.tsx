import classNames from "classnames";
import { Form, useActionData, useTransition } from "remix";
import InputError from "~/components/InputError";
import useUser from "~/hooks/useUser";

export default function Profile() {
  const user = useUser();
  const errors = useActionData();
  const { state, submission } = useTransition();
  const isLoading =
    (state === "submitting" || state === "loading") && !!submission;

  return (
    <div className="max-w-lg mx-auto h-full flex items-center justify-center">
      <Form
        method="post"
        className="p-10 card bg-base-200 w-full flex flex-col space-y-4"
      >
        <h1 className="text-xl text-center">Edit your profile</h1>

        <div className="form-control">
          <label className="label" htmlFor="profile-email">
            <span className="label-text">Email</span>
          </label>
          <input
            id="profile-email"
            name="email"
            type="text"
            required
            placeholder="hello@email.com"
            className="input"
            defaultValue={user.email}
          />

          <InputError errors={errors} path="email" />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="profile-name">
            <span className="label-text">Name</span>
          </label>
          <input
            id="profile-name"
            name="name"
            type="text"
            required
            placeholder="How you would like to be called"
            className="input"
            defaultValue={user.name}
          />

          <InputError errors={errors} path="name" />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="profile-current-password">
            <span className="label-text">Current password</span>
          </label>
          <input
            id="profile-current-password"
            name="currentPassword"
            type="password"
            placeholder="**************"
            className="input"
            required
          />

          <InputError errors={errors} path="currentPassword" />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="profile-new-password">
            <span className="label-text">New password</span>
          </label>
          <input
            id="profile-new-password"
            name="newPassword"
            type="password"
            placeholder="**************"
            className="input"
          />

          <InputError errors={errors} path="newPassword" />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="profile-passwordConfirmation">
            <span className="label-text">Confirm password</span>
          </label>
          <input
            id="profile-passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="**************"
            className="input"
          />

          <InputError errors={errors} path="passwordConfirmation" />
        </div>

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
  );
}
