import { faker } from "@faker-js/faker";
import { Screen } from "@playwright-testing-library/test/dist/fixture/types";
import {
  locatorFixtures as fixtures,
  LocatorFixtures as TestingLibraryFixtures,
} from "@playwright-testing-library/test/fixture";
import { Page, test as base } from "@playwright/test";
import { createUser } from "~/server/users.server";
import { truncateAll } from "../truncateAll";

export const USER_TEST_PASSWORD = "foobar";

export const test = base.extend<TestingLibraryFixtures>(fixtures);

/**
 * Let's truncate the database before all tests, for a fresh run.
 *
 * We can't do it beforeEach because playwright runs tests in parallel.
 * We could change it, but it would make testing very slow.
 */
test.beforeEach(truncateAll);

export const expect = test.expect;

export async function createUserAndLogin(page: Page, screen: Screen) {
  const password = USER_TEST_PASSWORD;
  const { errors, data } = await createUser({
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password,
    passwordConfirmation: password,
  });

  if (!data) throw errors;

  await page.goto("/");

  await screen.getByLabelText("Email").fill(data.email);
  await screen.getByLabelText("Password").fill(password);
  await screen.getByText("Login").click();
  await screen.findByText(`Welcome, ${data.name}!`);

  return data;
}
