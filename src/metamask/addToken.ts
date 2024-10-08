import { clickOnButton, retry, waitForOverlay } from "../helpers";
import { DappeteerPage } from "../puppeteer/page";

export const acceptAddToken =
  (page: DappeteerPage) => async (): Promise<void> => {
    await retry(async () => {
      await page.page.bringToFront();
      await page.page.reload();
      await waitForOverlay(page);

      await clickOnButton(page, "Add token", { timeout: 500 });
    }, 5);
  };

export const rejectAddToken =
  (page: DappeteerPage) => async (): Promise<void> => {
    await retry(async () => {
      await page.page.bringToFront();
      await page.page.reload();
      await waitForOverlay(page);

      await clickOnButton(page, "Cancel", { timeout: 500 });
    }, 5);
  };
