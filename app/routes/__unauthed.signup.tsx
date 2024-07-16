import type { MetaFunction } from "@remix-run/node";
import { unstable_defineAction } from "@remix-run/node";
import { createUser } from "~/data/users.server";
import SignUp from "~/modules/Auth/SignUp";
import { authenticate } from "~/web/auth.server";

export const action = unstable_defineAction(async ({ request }) => {
  const form = await request.formData();
  const result = await createUser(form);

  if (result.errors) return result.errors;

  return authenticate(result.data, { rememberMe: result.data.rememberMe });
});

export const meta: MetaFunction = () => [
  {
    title: "Sign up",
  },
];

export default function SignUpPage() {
  return <SignUp />;
}
