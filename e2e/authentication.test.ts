import { test } from "@playwright/test";

const BUILD_URL = (url = "/") => `http://localhost:3001${url}`;
const EMAIL = "test@mail.com";
const NAME = "Test name";
const PASSWORD = "foobar";

test("signs up", async ({ page }) => {
  await page.goto(BUILD_URL("/signup"));

  await page.fill("#signup-email", EMAIL);
  await page.fill("#signup-name", NAME);
  await page.fill("#signup-password", PASSWORD);
  await page.fill("#signup-passwordConfirmation", PASSWORD);
  await page.locator('button:has-text("Sign Up")').click();

  await page.waitForURL(BUILD_URL("/app/notes"), { timeout: 2000 });
});

test("logins", async ({ page }) => {
  await page.goto(BUILD_URL());

  await page.fill("#login-email", EMAIL);
  await page.fill("#login-password", PASSWORD);
  await page.locator('button:has-text("Login")').click();

  await page.waitForURL(BUILD_URL("/app/notes"), { timeout: 2000 });
});

test("shows login and then redirects to original page", async ({ page }) => {
  await page.goto(BUILD_URL("/app/profile"));

  await page.fill("#login-email", EMAIL);
  await page.fill("#login-password", PASSWORD);
  await page.locator('button:has-text("Login")').click();

  await page.waitForURL(BUILD_URL("/app/profile"), { timeout: 2000 });
});
