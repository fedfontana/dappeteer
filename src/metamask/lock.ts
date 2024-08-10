import { accountOptionsDropdownClick, clickOnButton } from "../helpers";
import { DappeteerPage } from "../puppeteer/page";

import { GetSingedIn, SetSignedIn } from "./index";

export const lock =
  (page: DappeteerPage, setSignedIn: SetSignedIn, getSingedIn: GetSingedIn) =>
  async (): Promise<void> => {
    if (!(await getSingedIn())) {
      throw new Error("You can't sign out because you haven't signed in yet");
    }
    await page.page.bringToFront();

    await accountOptionsDropdownClick(page);
    await clickOnButton(page, "global-menu-lock");

    await setSignedIn(false);
  };
