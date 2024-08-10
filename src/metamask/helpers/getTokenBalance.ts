import { clickOnButton } from "../../helpers";
import { DappeteerPage } from "../../puppeteer/page";

export const getTokenBalance =
  (page: DappeteerPage) =>
  async (tokenSymbol: string): Promise<number> => {
    await page.page.bringToFront();

    await clickOnButton(page, "Tokens");
    const assetListItems = await page.page.$$(
      `[data-testid="multichain-token-list-item-value"]`
    );

    for (let index = 0; index < assetListItems.length; index++) {
      const assetListItem = assetListItems[index];

      const tokenText: string = await page.page.evaluate((assetListItem) => {
        return (assetListItem as unknown as HTMLElement).innerText;
      }, assetListItem);

      if (tokenText.split(" ")[1].toUpperCase() === tokenSymbol.toUpperCase()) {
        const balance = tokenText.split(" ")[0];
        return parseFloat(balance);
      }
    }

    return 0;
  };
