import { faker } from "@faker-js/faker";
import { waitFor } from "@playwright-testing-library/test";
import { expect } from "@playwright/test";
import { verifyPassword } from "~/data/passwordUtils.server";
import prisma from "~/data/utils/prisma.server";
import {
  BUILD_URL,
  createUserAndLogin,
  test,
  USER_TEST_PASSWORD,
} from "./utils";

test("renders profile", async ({ page, screen }) => {
  const user = await createUserAndLogin(page, screen);

  await page.goto(BUILD_URL("/profile"));

  expect(page.getByText(user.name)).toBeTruthy();
  expect(page.getByText(user.email)).toBeTruthy();
});

test("updates profile", async ({ page, screen }) => {
  const user = await createUserAndLogin(page, screen);
  const newName = faker.name.firstName();
  const newEmail = faker.internet.email();
  const newPassword = faker.internet.password(8);

  await page.goto(BUILD_URL("/profile"));
  await page.getByLabel("Name").fill(newName);
  await page.getByLabel("Email").fill(newEmail);
  await page.getByLabel("New password").fill(newPassword);
  await page.getByLabel("Confirm password").fill(newPassword);
  await page.getByLabel("Current password").fill(USER_TEST_PASSWORD);
  await page.getByText("Update profile").click();

  await waitFor(async () => {
    expect(page.getByText(user.name)).toBeTruthy();

    const updatedUser = await prisma.user.findFirstOrThrow({
      where: { id: user.id },
    });

    expect(updatedUser.name).toEqual(newName);
    expect(updatedUser.email).toEqual(newEmail);
    // Check that the new password is applied
    expect(
      await verifyPassword(updatedUser.password, newPassword)
    ).toBeTruthy();
  });
});

test("does not update profile if password confirmation does not match", async ({
  page,
  screen,
}) => {
  const user = await createUserAndLogin(page, screen);
  const newPassword = faker.internet.password(8);

  await page.goto(BUILD_URL("/profile"));
  await page.getByLabel("New password").fill(newPassword);
  await page.getByLabel("Confirm password").fill(newPassword + "bad");
  await page.getByLabel("Current password").fill(USER_TEST_PASSWORD);
  await page.getByText("Update profile").click();

  await waitFor(async () => {
    expect(page.getByText("Passwords do not match")).toBeTruthy();

    const updatedUser = await prisma.user.findFirstOrThrow({
      where: { email: user.email },
    });
    expect({ ...updatedUser, password: null, updatedAt: null }).toEqual({
      ...user,
      password: null,
      updatedAt: null,
    });
    // Check that the old password is still valid
    expect(
      await verifyPassword(updatedUser.password, USER_TEST_PASSWORD)
    ).toBeTruthy();
  });
});

test("does not update profile if password is bad", async ({ page, screen }) => {
  const user = await createUserAndLogin(page, screen);
  const newName = faker.name.firstName();

  await page.goto(BUILD_URL("/profile"));
  await page.getByLabel("Name").fill(newName);
  await page.getByLabel("Current password").fill(USER_TEST_PASSWORD);
  await page.getByText("Update profile").click();

  await waitFor(async () => {
    expect(page.getByText("Wrong password")).toBeTruthy();

    const updatedUser = await prisma.user.findFirstOrThrow({
      where: { email: user.email },
    });
    expect({ ...updatedUser, password: null, updatedAt: null }).toEqual({
      ...user,
      password: null,
      updatedAt: null,
    });
  });
});
