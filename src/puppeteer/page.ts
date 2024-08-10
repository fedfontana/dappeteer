import { Page, WaitForSelectorOptions } from "puppeteer";
import { DappeteerBrowser } from "./browser";

export class DappeteerPage {
  constructor(
    protected pageSource: Page,
    protected browserSource: DappeteerBrowser
  ) {}

  get page(): Page {
    return this.pageSource;
  }

  get browser(): DappeteerBrowser {
    return this.browserSource;
  }

  async waitForTimeout(timeout: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  async waitForXPath(
    xpath: string,
    options?: WaitForSelectorOptions
  ): ReturnType<Page["waitForSelector"]> {
    return this.page.waitForSelector(`::-p-xpath(${xpath})`, options);
  }

  async waitForSelectorIsGone(
    selector: string,
    opts?: Partial<{ timeout: number }>
  ): Promise<void> {
    await this.page.waitForSelector(selector, {
      hidden: true,
      ...opts,
    });
  }
}
