import { test, expect } from "@playwright/test";

/**
 * register a new client user
 * login the new client user
 * register a new salon
 * login the new salon
 */

const clientUser = {
  firstName: "User",
  lastName: "Test",
  phoneNumber: "0788888888",
  password: "UserTest1",
};

test.describe("Register a new client user", () => {
  test.skip("Should register a new client user", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.getByTestId("drawerToggle").click();
    await page.getByTestId("login").click();
    await page.getByTestId("register").click();
    await page.getByTestId("firstName").fill(clientUser.firstName);
    await page.getByTestId("lastName").fill(clientUser.lastName);
    await page.getByTestId("phoneNumber").fill(clientUser.phoneNumber);
    await page.getByTestId("password").fill(clientUser.password);
    await page.getByTestId("submit").click();
    await page.waitForURL("http://localhost:5173/");
  });

  test("Should not register a new client user", async ({ page }) => {});

  test("Should login the new client user", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.getByTestId("drawerToggle").click();
    await page.getByTestId("login").click();
    await page.getByTestId("phoneNumber").fill(clientUser.phoneNumber);
    await page.getByTestId("password").fill(clientUser.password);
    await page.getByTestId("submit").click();
    await page.waitForURL("http://localhost:5173/");
  });

  test("Should not login the new client user", async ({ page }) => {});
});
