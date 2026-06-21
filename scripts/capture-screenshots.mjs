import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const baseUrl = process.env.CIVICGUARD_BASE_URL ?? "http://localhost:3000";
const outputDir = path.join(process.cwd(), "public", "screenshots");
const viewport = { width: 1440, height: 1000 };
const generatedFiles = [];

function screenshotPath(filename) {
  return path.join(outputDir, filename);
}

function resolveUrl(route) {
  return new URL(route, baseUrl).toString();
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function assertAppIsRunning() {
  for (let attempt = 1; attempt <= 10; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch(baseUrl, { signal: controller.signal });

      if (response.ok) {
        return;
      }
    } catch {
      // Retry below with a short delay.
    } finally {
      clearTimeout(timeout);
    }

    await sleep(1000);
  }

  throw new Error(
    `Could not reach ${baseUrl}. Start the app with "npm run dev" before capturing screenshots.`,
  );
}

async function waitForSettledPage(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(600);
}

async function goto(page, route) {
  await page.goto(resolveUrl(route), {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await waitForSettledPage(page);
}

async function capturePage(page, filename, options = {}) {
  const destination = screenshotPath(filename);

  await page.screenshot({
    path: destination,
    fullPage: options.fullPage ?? false,
    animations: "disabled",
  });
  generatedFiles.push(`public/screenshots/${filename}`);
  console.log(`Saved ${destination}`);
}

async function captureLocator(page, testId, filename) {
  const destination = screenshotPath(filename);
  const locator = page.getByTestId(testId);

  await locator.waitFor({ state: "visible", timeout: 15000 });
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await locator.screenshot({
    path: destination,
    animations: "disabled",
  });
  generatedFiles.push(`public/screenshots/${filename}`);
  console.log(`Saved ${destination}`);
}

async function clearDemoStorage(page) {
  await goto(page, "/");
  await page.evaluate(() => {
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith("civicguard:")) {
        window.localStorage.removeItem(key);
      }
    }
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForSettledPage(page);
}

async function run() {
  await assertAppIsRunning();
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    locale: "en-US",
    timezoneId: "Africa/Johannesburg",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);

  try {
    await clearDemoStorage(page);

    await goto(page, "/");
    await captureLocator(page, "home-hero", "home-hero.png");
    await captureLocator(page, "judge-demo-flow", "home-demo-flow.png");
    await capturePage(page, "home-full.png", { fullPage: true });

    await goto(page, "/submit");
    await page.getByTestId("load-demo-case").click();
    await page.waitForFunction(
      (expectedTitle) =>
        [...document.querySelectorAll("input")].some(
          (input) => input.value === expectedTitle,
        ),
        "Code-switched WhatsApp message claims polling station relocated",
    );
    await capturePage(page, "submit-demo-filled.png", { fullPage: true });

    await page.getByTestId("generate-triage-report").click();
    await page.waitForURL(/\/triage-result\?incidentId=/, { timeout: 15000 });
    await waitForSettledPage(page);
    await page.getByText("Incident report").first().waitFor();
    await capturePage(page, "triage-report.png", { fullPage: true });

    await goto(page, "/community");
    await page
      .getByText("Code-switched WhatsApp message claims polling station relocated")
      .first()
      .waitFor();
    await capturePage(page, "community-review.png", { fullPage: true });

    await goto(page, "/dashboard");
    await page.getByText("Civic risk monitoring dashboard").waitFor();
    await page.locator("svg").first().waitFor({ timeout: 10000 }).catch(() => {});
    await capturePage(page, "dashboard.png", { fullPage: true });

    await goto(page, "/benchmark-lab");
    await captureLocator(page, "benchmark-summary", "benchmark-lab-summary.png");
    await capturePage(page, "benchmark-lab-full.png", { fullPage: true });

    await goto(page, "/about");
    await page.getByText("CivicGuard Africa").first().waitFor();
    await capturePage(page, "about.png", { fullPage: true });

    console.log("\nScreenshots generated:");
    for (const file of generatedFiles) {
      console.log(`- ${file}`);
    }
  } catch (error) {
    console.error("\nScreenshot capture failed.");
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

run();
