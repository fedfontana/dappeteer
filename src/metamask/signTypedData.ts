import { clickOnButton, clickOnLittleDownArrowIfNeeded } from "../helpers";

import { DappeteerPage } from "../puppeteer/page";
import { GetSingedIn } from ".";

export const signTypedData =
  (page: DappeteerPage, getSingedIn: GetSingedIn) =>
  async (): Promise<void> => {
    await page.page.bringToFront();
    if (!(await getSingedIn())) {
      throw new Error("You haven't signed in yet");
    }
    await page.page.reload();
    await clickOnLittleDownArrowIfNeeded(page);
    await clickOnButton(page, "Sign");
    // wait for MM to be back in a stable state
    await page.page.waitForSelector(".multichain-app-header", {
      visible: true,
    });
  };
