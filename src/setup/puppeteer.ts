import { PuppeteerNode } from "puppeteer";
import { DappeteerBrowser } from "../browser";
import { PuppeteerLaunchOptions } from "../types";
import { DPuppeteerBrowser } from "../puppeteer";

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
  return new DPuppeteerBrowser(pBrowser, userDataDir, false);
}
