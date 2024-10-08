import {
  clickOnElement,
  profileDropdownClick,
  retry,
  typeOnInputField,
} from "../helpers";
import { DappeteerPage } from "../puppeteer/page";

export const createAccount =
  (page: DappeteerPage) =>
  async (accountName: string): Promise<void> => {
    await retry(async () => {
      await page.page.bringToFront();
      await profileDropdownClick(page);
      await clickOnElement(page, "Add account");
      await typeOnInputField(page, "Account name", accountName);
      await clickOnElement(page, "Create");
    }, 5);
  };
