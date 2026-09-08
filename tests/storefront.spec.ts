import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("browse, search, quick view, cart persistence and review", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.getByRole("link", { name: "Explore the collection" }).click();
  await expect(
    page.getByRole("heading", { name: "Shop", exact: true }),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Search products" }).fill("zzzz");
  await expect(page.getByText("No pieces match")).toBeVisible();
  await page.getByRole("textbox", { name: "Search products" }).fill("Sora");
  await page.getByRole("button", { name: "Quick view Sora" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Quick view Sora" }).click();
  await page.getByRole("button", { name: "Add to cart", exact: true }).click();
  await page.getByRole("link", { name: "Bag 1" }).click();
  await expect(page.getByRole("heading", { name: "Your Cart" })).toBeVisible();
  await page.getByRole("spinbutton").fill("3");
  await page.reload();
  await expect(page.getByRole("spinbutton")).toHaveValue("3");
  await page.getByRole("button", { name: "Save for later" }).click();
  await expect(page.getByText("Your cart is empty.")).toBeVisible();
  await page.getByRole("button", { name: "Move to cart" }).click();
  await page.getByRole("link", { name: "Checkout", exact: true }).click();
  await page.getByRole("button", { name: "Save selection" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No order has been placed",
  );
  expect(errors).toEqual([]);
});
test("mobile menu, filters, product quantity and no horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "The collection" })
    .click();
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(1);
  await page
    .getByRole("dialog")
    .getByRole("spinbutton", { name: "Max price" })
    .fill("1500");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.goto("/product/sora-sofa");
  await page.getByRole("spinbutton").fill("-3");
  await expect(page.getByRole("spinbutton")).toHaveValue("1");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await page.getByRole("link", { name: "Bag 1" }).click();
  for (const route of [
    "/",
    "/products",
    "/product/sora-sofa",
    "/cart",
    "/checkout",
    "/missing",
  ]) {
    await page.goto(route);
    await page.waitForTimeout(450);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBe(true);
    expect(
      await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs
            .filter((i) => i.getBoundingClientRect().top < innerHeight)
            .every(
              (i) =>
                (i as HTMLImageElement).complete &&
                (i as HTMLImageElement).naturalWidth > 0,
            ),
        ),
      route + " images",
    ).toBe(true);
  }
});
test("accessibility in both themes, scroll sections and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const theme of ["light", "dark"]) {
    if (theme === "dark")
      await page.getByRole("button", { name: "Switch to dark mode" }).click();
    for (const route of [
      "/",
      "/products",
      "/product/sora-sofa",
      "/cart",
      "/checkout",
    ]) {
      await page.goto(route);
      await page.waitForTimeout(500);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations, theme + route).toEqual([]);
    }
  }
  await page.goto("/#story");
  await expect(page.locator("#story")).toBeInViewport();
  await page.reload();
  await expect(page.locator("html")).toHaveClass("dark");
});
test("malformed local data cannot crash the cart or set a product price", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem(
      "bw_cart",
      JSON.stringify([
        { product: { id: "sora-sofa", price: 1 }, qty: -4 },
        null,
        { product: { id: "not-real" }, qty: 9000 },
      ]),
    );
  });
  await page.goto("/cart");
  await expect(page.getByRole("spinbutton")).toHaveValue("1");
  await expect(page.getByText("$3299").first()).toBeVisible();
});
