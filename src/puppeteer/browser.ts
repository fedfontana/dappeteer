import fs from "fs/promises";
import path from "path";
import { Browser } from "puppeteer";
import { copyUserDataFiles } from "../helpers/utils";
import { DappeteerPage } from "./page";

export class DappeteerBrowser {
  constructor(
    protected browserSource: Browser,
    protected userDataDir: string
  ) {}

  async close(): Promise<void> {
    await this.browser.close();
    await fs.rm(this.userDataDir, { recursive: true, force: true });
  }

  async pages(): Promise<DappeteerPage[]> {
    return (await this.browser.pages()).map((p) => {
      return new DappeteerPage(p, this);
    });
  }

  async newPage(): Promise<DappeteerPage> {
    return new DappeteerPage(await this.browserSource.newPage(), this);
  }

  get browser(): Browser {
    return this.browserSource;
  }

  getUserDataDirPath(): string {
    return this.userDataDir;
  }

  storeUserData(destination: string): boolean {
    const location = path.resolve(destination);
    try {
      copyUserDataFiles(this.userDataDir, location);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
