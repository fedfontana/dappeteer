import { clickOnButton, retry, waitForOverlay } from "../helpers";
import { DappeteerPage } from "../puppeteer/page";

export const acceptAddNetwork =
  (page: DappeteerPage) =>
  async (shouldSwitch = false): Promise<void> => {
    await retry(async () => {
      await page.page.bringToFront();
      await page.page.reload();
      await waitForOverlay(page);
      await page.page.waitForSelector(".confirmation-page", {
        timeout: 1000,
      });
      await clickOnButton(page, "Approve", { timeout: 500 });
    }, 5);
    if (shouldSwitch) {
      await clickOnButton(page, "Switch network");
      await page.page.waitForSelector(".new-network-info__wrapper", {
        visible: true,
      });
      await clickOnButton(page, "Got it");
    } else {
      await clickOnButton(page, "Cancel");
    }
  };

export const rejectAddNetwork =
  (page: DappeteerPage) => async (): Promise<void> => {
    await retry(async () => {
      await page.page.bringToFront();
      await page.page.reload();
      await waitForOverlay(page);

      await clickOnButton(page, "Cancel", { timeout: 500 });
    }, 5);
  };
