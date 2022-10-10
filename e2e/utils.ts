import { test as base } from "@playwright/test";
import {
  locatorFixtures as fixtures,
  LocatorFixtures as TestingLibraryFixtures,
} from "@playwright-testing-library/test/fixture";

export const test = base.extend<TestingLibraryFixtures>(fixtures);
export const expect = test.expect;
