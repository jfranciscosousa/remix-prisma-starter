import { faker } from "@faker-js/faker";
import { waitFor } from "@playwright-testing-library/test";
import { Screen } from "@playwright-testing-library/test/dist/fixture/types";
import { expect } from "@playwright/test";
import { createUserAndLogin, test } from "./utils";

async function createNote(screen: Screen) {
  const note = faker.git.commitSha();

  screen.getByLabelText("New todo").fill(note);
  screen.getByText("Submit").click();
  await screen.findByText(note);

  return note;
}

async function getNotesLength(screen: Screen) {
  return (await screen.queryAllByLabelText("Delete note").allTextContents())
    .length;
}

test("creates notes", async ({ page, screen }) => {
  await createUserAndLogin(page, screen);

  const note = await createNote(screen);

  expect(await screen.getByText(note).count()).toBe(1);
});

test("deletes notes", async ({ page, screen }) => {
  await createUserAndLogin(page, screen);
  await createNote(screen);

  const notesCountBefore = await getNotesLength(screen);
  screen.getAllByLabelText("Delete note").first().click();

  await waitFor(async () =>
    expect(await getNotesLength(screen)).toBe(notesCountBefore - 1),
  );
});

test("deletes all notes", async ({ page, screen }) => {
  await createUserAndLogin(page, screen);
  await createNote(screen);
  await createNote(screen);
  await createNote(screen);

  screen.getAllByLabelText("Delete all notes").first().click();

  await waitFor(async () => expect(await getNotesLength(screen)).toBe(0));
});
