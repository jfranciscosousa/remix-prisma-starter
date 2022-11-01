import { BUILD_URL, test } from "./utils";

const EMAIL = "test@mail.com";
const NAME = "Test name";
const PASSWORD = "foobar";

test("signs up", async ({ page, screen }) => {
  await page.goto(BUILD_URL("/signup"));

  await screen.getByLabelText("Email").fill(EMAIL);
  await screen.getByLabelText("Name").fill(NAME);
  await screen.getByLabelText("Password").fill(PASSWORD);
  await screen.getByLabelText("Confirm password").fill(PASSWORD);
  await screen.getByText("Sign up").click();

  await page.waitForURL(BUILD_URL("/app/notes"), { timeout: 2000 });
});

test("logins", async ({ page, screen }) => {
  await page.goto(BUILD_URL());
  await screen.getByLabelText("Email").fill(EMAIL);
  await screen.getByLabelText("Password").fill(PASSWORD);
  await screen.getByText("Login").click();

  await page.waitForURL(BUILD_URL("/app/notes"), { timeout: 2000 });
});

test("shows login and then redirects to original page", async ({
  page,
  screen,
}) => {
  await page.goto(BUILD_URL("/app/profile"));

  await screen.getByLabelText("Email").fill(EMAIL);
  await screen.getByLabelText("Password").fill(PASSWORD);
  await screen.getByText("Login").click();

  await page.waitForURL(BUILD_URL("/app/profile"), { timeout: 2000 });
});
