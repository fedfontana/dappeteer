import { MetaMaskInpageProvider } from "@metamask/providers";
import type { launch as puppeteerLaunch } from "puppeteer";
import { DappeteerPage, Serializable } from "./page";
import { Path } from "./setup/utils/metaMaskDownloader";
import { DappeteerBrowser, RECOMMENDED_METAMASK_VERSION } from "./index";

export type DappeteerLaunchOptions = {
  metaMaskVersion?:
    | typeof RECOMMENDED_METAMASK_VERSION
    | "latest"
    | "local"
    | string;
  metaMaskLocation?: Path;
  metaMaskPath?: string;
  userDataDir?: string;
  key?: string;
};

export type PuppeteerLaunchOptions = Parameters<typeof puppeteerLaunch>[0];

export type CustomAutomation = (
  metamaskPath: string,
  userDataDir: string,
  options: DappeteerLaunchOptions
) => Promise<DappeteerBrowser>;

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type MetaMaskOptions = {
  seed: string;
  password?: string;
  showTestNets?: boolean;
};

export type TransactionOptions = {
  gas?: number;
  gasLimit?: number;
  priority?: number;
};

export type Dappeteer = {
  lock: () => Promise<void>;
  unlock: (password: string) => Promise<void>;
  acceptAddNetwork: (shouldSwitch?: boolean) => Promise<void>;
  rejectAddNetwork: () => Promise<void>;
  acceptAddToken: () => Promise<void>;
  rejectAddToken: () => Promise<void>;
  importPK: (pk: string) => Promise<void>;
  switchAccount: (accountNumber: number) => Promise<void>;
  switchNetwork: (network: string) => Promise<void>;
  confirmTransaction: (options?: TransactionOptions) => Promise<void>;
  sign: () => Promise<void>;
  signTypedData: () => Promise<void>;
  approve: () => Promise<void>;
  createAccount: (accountName: string) => Promise<void>;
  helpers: {
    getTokenBalance: (tokenSymbol: string) => Promise<number>;
    deleteAccount: (accountNumber: number) => Promise<void>;
    deleteNetwork: (name: string) => Promise<void>;
  };
  page: DappeteerPage;
};
