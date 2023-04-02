import classNames from "classnames";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import FullInput from "~/components/FullInput";

export default function SignUp() {
  const errors = useActionData() || {};
  const { state, formData } = useNavigation();
  const isLoading =
    (state === "submitting" || state === "loading") && !!formData;

  return (
    <div className="max-w-lg w-full mx-auto h-full flex items-center justify-center">
      <Form
        method="post"
        action="/signup"
        className="p-10 card bg-base-200 w-full flex flex-col space-y-4"
      >
        <h1 className="text-xl text-center">Please sign up</h1>

        <FullInput
          label="Email"
          name="email"
          type="text"
          required
          placeholder="hello@email.com"
          errors={errors}
        />

        <FullInput
          label="Name"
          name="name"
          type="text"
          required
          placeholder="How you would like to be called"
          errors={errors}
        />

        <FullInput
          label="Password"
          name="password"
          type="password"
          placeholder="**************"
          required
          errors={errors}
        />

        <FullInput
          label="Confirm password"
          name="passwordConfirmation"
          type="password"
          placeholder="**************"
          required
          errors={errors}
          className="pb-4"
        />

        <button
          type="submit"
          className={classNames("btn btn-primary mt-8", {
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
