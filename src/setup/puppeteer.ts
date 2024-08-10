import { PuppeteerNode } from "puppeteer";
import { PuppeteerLaunchOptions } from "../types";
import { DappeteerBrowser } from "../puppeteer/browser";

export async function launchPuppeteer(
  puppeteer: PuppeteerNode,
  puppeteerOptions: PuppeteerLaunchOptions = {},
  metamaskPath: string,
  userDataDir: string
): Promise<DappeteerBrowser> {
  const pBrowser = await puppeteer.launch({
    ...(puppeteerOptions ?? {}),
    userDataDir,
    args: [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      ...(puppeteerOptions?.args || []),
    ],
  });
  return new DappeteerBrowser(pBrowser, userDataDir);
}
