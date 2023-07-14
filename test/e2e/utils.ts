import { faker } from "@faker-js/faker";
import { Screen } from "@playwright-testing-library/test/dist/fixture/types";
import {
  locatorFixtures as fixtures,
  LocatorFixtures as TestingLibraryFixtures,
} from "@playwright-testing-library/test/fixture";
import { Page, test as base } from "@playwright/test";
import { createUser } from "~/data/users/users.server";
import { truncateAll } from "../truncateAll";

export const USER_TEST_PASSWORD = "foobar";

export const test = base.extend<TestingLibraryFixtures>(fixtures);
// Clear database before running tests
test.beforeAll(truncateAll);

export const expect = test.expect;

export const BUILD_URL = (url = "/") => `http://localhost:3001${url}`;

export async function createUserAndLogin(page: Page, screen: Screen) {
  const password = USER_TEST_PASSWORD;
  const { errors, data } = await createUser({
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password,
    passwordConfirmation: password,
  });

  if (!data) throw errors;

  await page.goto(BUILD_URL());

  await screen.getByLabelText("Email").fill(data.email);
  await screen.getByLabelText("Password").fill(password);
  await screen.getByText("Login").click();
  await screen.findByText(`Welcome, ${data.name}!`);

  return data;
}
