import fs from "fs/promises";
import path from "path";
import { PuppeteerNode } from "puppeteer";
import { DappeteerBrowser, RECOMMENDED_METAMASK_VERSION } from "..";
import { DappeteerLaunchOptions, PuppeteerLaunchOptions } from "../types";
import { copyUserDataFiles } from "../helpers/utils";
import { launchPuppeteer } from "./puppeteer";
import { isNewerVersion } from "./utils/isNewerVersion";
import downloader from "./utils/metaMaskDownloader";
import { getTemporaryUserDataDir } from "./utils/getTemporaryUserDataDir";
import { patchMetaMask } from "./utils/patch";

/**
 * Launch Puppeteer chromium instance with MetaMask plugin installed
 * */
export async function launch(
  puppeteer: PuppeteerNode,
  puppeteerOptions: PuppeteerLaunchOptions = {},
  options: DappeteerLaunchOptions = {}
): Promise<DappeteerBrowser> {
  if (!options.metaMaskVersion && !options.metaMaskPath) {
    options.metaMaskVersion = RECOMMENDED_METAMASK_VERSION;
  }
  let metamaskPath: string;
  if (options.metaMaskVersion) {
    const { metaMaskVersion, metaMaskLocation } = options;
    if (metaMaskVersion === "latest") {
      console.warn(
        "\x1b[33m%s\x1b[0m",
        `It is not recommended to run MetaMask with "latest" version. Use it at your own risk or set to the recommended version "${RECOMMENDED_METAMASK_VERSION}".`
      );
    } else if (isNewerVersion(RECOMMENDED_METAMASK_VERSION, metaMaskVersion)) {
      console.warn(
        "\x1b[33m%s\x1b[0m",
        `Seems you are running newer version of MetaMask that recommended by dappeteer team.
      Use it at your own risk or set to the recommended version "${RECOMMENDED_METAMASK_VERSION}".`
      );
    } else if (isNewerVersion(metaMaskVersion, RECOMMENDED_METAMASK_VERSION)) {
      console.warn(
        "\x1b[33m%s\x1b[0m",
        `Seems you are running older version of MetaMask that recommended by dappeteer team.
      Use it at your own risk or set the recommended version "${RECOMMENDED_METAMASK_VERSION}".`
      );
    } else {
      console.log(
        `
        Running tests on MetaMask version ${metaMaskVersion}
        Headless: ${String(puppeteerOptions?.headless ?? false)}
        `
      );
    }

    console.log(); // new line

    metamaskPath = await downloader(metaMaskVersion, {
      location: metaMaskLocation,
    });
  } else {
    console.log(`Running tests on local MetaMask build`);

    metamaskPath = options.metaMaskPath;
  }

  patchMetaMask(metamaskPath, { key: options.key });
  const userDataDir = getTemporaryUserDataDir();
  if (options.userDataDir)
    copyUserDataFiles(path.resolve(options.userDataDir), userDataDir);

  try {
    return await launchPuppeteer(
      puppeteer,
      puppeteerOptions,
      metamaskPath,
      userDataDir
    );
  } catch (error) {
    await fs.rm(userDataDir, { recursive: true, force: true });
    throw new Error("Failed to launch puppeteer");
  }
}
