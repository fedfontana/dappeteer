// re-export
export { getMetaMask, getMetaMaskWindow } from "./metamask";
export {
  Dappeteer,
  DappeteerLaunchOptions,
  MetaMaskOptions,
  TransactionOptions,
  CustomAutomation,
} from "./types";
export { DappeteerBrowser } from "./puppeteer/browser";
export { DappeteerPage } from "./puppeteer/page";
export { DappeteerElementHandle } from "./element";
export {
  bootstrap,
  launch,
  setupMetaMask,
  setupBootstrappedMetaMask,
} from "./setup";
export { DapeteerJestConfig } from "./jest/global";

// default constants
export {
  RECOMMENDED_METAMASK_VERSION,
  DEFAULT_METAMASK_USERDATA,
  DEFAULT_FLASK_USERDATA,
} from "./constants";
