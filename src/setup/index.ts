import { PuppeteerNode } from "puppeteer";
import {
  Dappeteer,
  DappeteerLaunchOptions,
  MetaMaskOptions,
  PuppeteerLaunchOptions,
} from "../types";
import { DappeteerBrowser } from "../puppeteer/browser";
import { DappeteerPage } from "../puppeteer/page";
import { launch } from "./launch";
import { setupBootstrappedMetaMask, setupMetaMask } from "./setupMetaMask";

export * from "./launch";
export * from "./setupMetaMask";

/**
 * Launches browser and installs required metamask version along with setting up initial account
 */
export const bootstrap = async ({
  puppeteer,
  puppeteerLaunchOptions,
  dappeteerLaunchOptions,
  metamaskOptions,
}: {
  puppeteer: PuppeteerNode;
  puppeteerLaunchOptions: PuppeteerLaunchOptions;
  dappeteerLaunchOptions: DappeteerLaunchOptions;
  metamaskOptions: MetaMaskOptions;
}): Promise<{
  metaMask: Dappeteer;
  browser: DappeteerBrowser;
  metaMaskPage: DappeteerPage;
}> => {
  const browser = await launch(
    puppeteer,
    puppeteerLaunchOptions,
    dappeteerLaunchOptions
  );
  const metaMask = await (dappeteerLaunchOptions.userDataDir
    ? setupBootstrappedMetaMask(browser, metamaskOptions.password)
    : setupMetaMask(browser, metamaskOptions));

  return {
    metaMask,
    browser,
    metaMaskPage: metaMask.page,
  };
};
