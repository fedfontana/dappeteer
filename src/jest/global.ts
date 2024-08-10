import { Dappeteer, DappeteerLaunchOptions, MetaMaskOptions } from "..";
import { DappeteerBrowser } from "../puppeteer/browser";
import { DappeteerPage } from "../puppeteer/page";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      page: DappeteerPage;
      browser: DappeteerBrowser;
      metaMask: Dappeteer;
    }
  }
}

export type DapeteerJestConfig = Partial<{
  dappeteer: DappeteerLaunchOptions;
  metaMask: MetaMaskOptions;
}>;
