import { mkdir } from "node:fs/promises";
import { expect, test } from "@playwright/test";

const OUT = "submission/screenshots";

test("capture wall screenshots", async ({ browser }) => {
  test.setTimeout(90_000);
  await mkdir(OUT, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/");
  if (await page.getByTestId("wall-setup").isVisible()) {
    test.skip(true, "Supabase environment variables are not set");
  }
  await expect(page.getByTestId("wall-message")).toBeVisible();

  if ((await page.getByTestId("wall-post").count()) === 0) {
    const message = "Back on the wall. 2008 forever.";
    await page.getByTestId("wall-message").fill(message);
    await page.getByTestId("share-post").click();
    await expect(page.getByTestId("wall-post-content").first()).toHaveText(
      message,
    );
  }

  await page
    .getByTestId("wall-message")
    .fill("Anyone else still checking their wall in 2026?");
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/wall-desktop.png`, fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByTestId("wall-post").first()).toBeVisible();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/wall-mobile.png`, fullPage: true });

  await context.close();
});
