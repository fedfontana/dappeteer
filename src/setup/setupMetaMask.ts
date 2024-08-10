import { getMetaMask } from "../metamask";
import { Dappeteer, MetaMaskOptions } from "../types";

import { retry, waitForOverlay } from "../helpers";
import { DappeteerPage } from "../puppeteer/page";
import { DappeteerBrowser } from "../puppeteer/browser";
import {
  closeWhatsNewModal,
  enableEthSign,
  importAccount,
  showTestNets,
} from "./setupActions";

/**
 * Setup MetaMask with base account
 * */
type Step<Options> = (
  page: DappeteerPage,
  options?: Options
) => void | Promise<void>;

const defaultMetaMaskSteps: Step<MetaMaskOptions>[] = [
  importAccount,
  closeWhatsNewModal,
  showTestNets,
  enableEthSign,
];

const MM_HOME_REGEX = "chrome-extension://[a-z]+/home.html";

export async function setupMetaMask(
  browser: DappeteerBrowser,
  options?: MetaMaskOptions
): Promise<Dappeteer> {
  const page = await getMetaMaskPage(browser);

  // await page.setViewport({ width: 1920, height: 1080 });
  // goes through the installation steps required by MetaMask
  for (const step of defaultMetaMaskSteps) {
    await step(page, options);
  }

  return getMetaMask(page);
}

export async function setupBootstrappedMetaMask(
  browser: DappeteerBrowser,
  password: string
): Promise<Dappeteer> {
  const page = await getMetaMaskPage(browser);
  const metaMask = await getMetaMask(page);

  await metaMask.page.page.evaluate(() => {
    (window as unknown as { signedIn: boolean }).signedIn = false;
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await waitForOverlay(page);
  await retry(() => metaMask.unlock(password), 3);

  await waitForOverlay(page);
  return metaMask;
}

async function getMetaMaskPage(
  browser: DappeteerBrowser
): Promise<DappeteerPage> {
  const pages = await browser.pages();
  for (const page of pages) {
    if (page.page.url().match(MM_HOME_REGEX)) {
      return page;
    }
  }
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    browser.browser.on("targetcreated", async (target: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      if (target.url().match(MM_HOME_REGEX)) {
        try {
          const pages = await browser.pages();
          for (const page of pages) {
            if (page.page.url().match(MM_HOME_REGEX)) {
              resolve(page);
            }
          }
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}
