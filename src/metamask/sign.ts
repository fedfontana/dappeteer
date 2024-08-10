import {
  clickOnButton,
  getElementByContent,
  retry,
  waitForOverlay,
} from "../helpers";

import { DappeteerPage } from "../puppeteer/page";
import { GetSingedIn } from ".";

export const sign =
  (page: DappeteerPage, getSingedIn: GetSingedIn) =>
  async (): Promise<void> => {
    await page.page.bringToFront();
    if (!(await getSingedIn())) {
      throw new Error("You haven't signed in yet");
    }

    //retry till we get prompt
    await retry(async () => {
      await page.page.bringToFront();
      await page.page.reload();
      await waitForOverlay(page);
      await getElementByContent(page, "Sign", "button", { timeout: 200 });
    }, 5);

    await clickOnButton(page, "Sign");

    const warningSignButton = await page.page.waitForSelector(
      ".signature-request-warning__footer__sign-button"
    );
    await warningSignButton.click();

    // wait for MM to be back in a stable state
    await page.page.waitForSelector(".multichain-app-header", {
      visible: true,
    });
  };
