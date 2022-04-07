import classNames from "classnames";
import { Form, useActionData, useTransition } from "remix";
import FullInput from "~/components/FullInput";
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

        <FullInput
          label="Email"
          name="email"
          type="text"
          required
          placeholder="hello@email.com"
          defaultValue={user.email}
          errors={errors}
        />

        <FullInput
          label="Name"
          name="name"
          type="text"
          required
          placeholder="How you would like to be called"
          defaultValue={user.name}
          errors={errors}
        />

        <FullInput
          label="Current password"
          name="currentPassword"
          type="password"
          placeholder="**************"
          required
          errors={errors}
        />

        <FullInput
          label="New password"
          name="newPassword"
          type="password"
          placeholder="**************"
          errors={errors}
        />

        <FullInput
          label="Confirm password"
          name="passwordConfirmation"
          type="password"
          placeholder="**************"
          errors={errors}
          className="pb-4"
        />

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
