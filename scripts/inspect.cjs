const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:5174");
  await page.waitForTimeout(1200);
  for (let y = 0; y < 4200; y += 600) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  await page.screenshot({ path: "tmp/home-desktop.png", fullPage: true });
  let a = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  console.log(
    "desktop accessibility",
    JSON.stringify(
      a.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ),
  );
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await page.screenshot({ path: "tmp/home-dark.png", fullPage: true });
  a = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  console.log(
    "dark accessibility",
    JSON.stringify(
      a.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ),
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=500){await page.evaluate(y=>window.scrollTo({top:y,behavior:"instant"}),y);await page.waitForTimeout(200)}
  await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
  await page.waitForTimeout(700);
  await page.screenshot({ path: "tmp/home-mobile.png", fullPage: true });
  await page.screenshot({path:"tmp/mobile-first-screen.png"});
  for (const route of [
    "/products",
    "/product/sora-sofa",
    "/cart",
    "/checkout",
    "/missing",
  ]) {
    await page.goto("http://127.0.0.1:5174" + route);
    await page.waitForTimeout(600);
    a = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    console.log(route, {
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      violations: a.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    });
  }
  console.log("errors", errors);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
