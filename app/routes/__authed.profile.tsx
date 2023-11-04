import { Form, useActionData } from "@remix-run/react";
import type {
  DataFunctionArgs,
  SerializeFrom,
  MetaFunction,
} from "@remix-run/node";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { FullInput } from "~/components/ui/full-input";
import { updateUser } from "~/data/users.server";
import useIsLoading from "~/hooks/useIsLoading";
import useUser from "~/hooks/useUser";
import { userIdFromRequest } from "~/web/auth.server";
import { Card, CardTitle } from "~/components/ui/card";
import { useToast } from "~/components/ui/use-toast";

export type ProfileRouteActionType = SerializeFrom<typeof action>;

export const action = async ({ request }: DataFunctionArgs) => {
  const userId = await userIdFromRequest(request);
  const form = await request.formData();

  return await updateUser(userId, form);
};

export const meta: MetaFunction = () => [
  {
    title: "Profile",
  },
  {
    description: "Welcome to remix!",
  },
];

export default function Profile() {
  const user = useUser();
  const actionData = useActionData<ProfileRouteActionType>();
  const { toast } = useToast();
  const isLoading = useIsLoading();

  useEffect(() => {
    if (actionData?.errors) {
      toast({ title: "Failed to update profile!", variant: "destructive" });
    } else if (actionData?.data) toast({ title: "Updated profile!" });
  }, [actionData, toast]);

  return (
    <Card className="max-w-lg w-full mx-auto flex items-center justify-center">
      <Form method="post" className="p-10 w-full flex flex-col space-y-4">
        <CardTitle className="mb-8">Edit your profile</CardTitle>

        <FullInput
          label="Email"
          name="email"
          type="text"
          required
          placeholder="hello@email.com"
          defaultValue={user.email}
          errors={actionData?.errors}
        />

        <FullInput
          label="Name"
          name="name"
          type="text"
          required
          placeholder="How you would like to be called"
          defaultValue={user.name}
          errors={actionData?.errors}
        />

        <FullInput
          label="Current password"
          name="currentPassword"
          type="password"
          placeholder="**************"
          required
          errors={actionData?.errors}
        />

        <FullInput
          label="New password"
          name="newPassword"
          type="password"
          placeholder="**************"
          errors={actionData?.errors}
        />

        <FullInput
          label="Confirm password"
          name="passwordConfirmation"
          type="password"
          placeholder="**************"
          errors={actionData?.errors}
          className="pb-4"
        />

        <Button type="submit" isLoading={isLoading}>
          Update profile
        </Button>
      </Form>
    </Card>
  );
}
