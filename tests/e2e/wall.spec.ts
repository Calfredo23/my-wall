import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function requireSupabase(page: Page) {
  await page.goto("/");
  if (await page.getByTestId("wall-setup").isVisible()) {
    test.skip(true, "Supabase environment variables are not set");
  }
  await expect(page.getByTestId("wall-message")).toBeVisible();
}

test("the wall renders its shell", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "The Wall" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Cedrick Alfredo Catimbang", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByTestId("wall-message").or(page.getByTestId("wall-setup")),
  ).toBeVisible();
});

test("the wall has no axe violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.map((violation) => ({
      id: violation.id,
      nodes: violation.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});

test("the opening page has no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(String(error)));

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "The Wall" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("layouts fit 360, 768 and 1440 without horizontal scroll", async ({
  page,
}) => {
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const report = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(report.scrollWidth).toBeLessThanOrEqual(report.innerWidth + 1);
  }
});

test.describe("Supabase flow", () => {
  test("a message is saved, newest-first, and survives a reload", async ({
    page,
  }) => {
    await requireSupabase(page);
    const first = `Wall test ${Date.now()}`;
    const second = `${first} follow-up`;

    await page.getByTestId("wall-message").fill(first);
    await page.getByTestId("share-post").click();
    await expect(page.getByTestId("wall-post-content").first()).toHaveText(first);

    await page.getByTestId("wall-message").fill(second);
    await page.getByTestId("share-post").click();
    await expect(page.getByTestId("wall-post-content").first()).toHaveText(second);
    await expect(page.getByTestId("wall-post-content").nth(1)).toHaveText(first);

    await page.reload();
    await expect(page.getByTestId("wall-post-content").first()).toHaveText(second);
    await expect(page.getByTestId("wall-post-content").nth(1)).toHaveText(first);
  });

  test("a second visitor sees a new post without refreshing", async ({
    browser,
  }) => {
    const message = `Realtime test ${Date.now()}`;
    const contextA = await browser.newContext();
    const contextB = await browser.newContext();
    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    await pageA.goto("/");
    await pageB.goto("/");
    if (await pageA.getByTestId("wall-setup").isVisible()) {
      test.skip(true, "Supabase environment variables are not set");
    }
    await expect(pageA.getByTestId("wall-message")).toBeVisible();
    await expect(pageB.getByTestId("wall-message")).toBeVisible();

    await pageA.getByTestId("wall-message").fill(message);
    await pageA.getByTestId("share-post").click();

    await expect(pageB.getByTestId("wall-post-content").first()).toHaveText(
      message,
      { timeout: 7000 },
    );

    await contextA.close();
    await contextB.close();
  });

  test("the composer caps messages at 280 characters", async ({ page }) => {
    await requireSupabase(page);
    const composer = page.getByTestId("wall-message");
    await expect(composer).toHaveAttribute("maxlength", "280");
    await composer.fill("x".repeat(280));
    await expect(page.getByTestId("character-count")).toHaveText("280/280");
    await expect(page.getByTestId("share-post")).toBeEnabled();
  });
});
