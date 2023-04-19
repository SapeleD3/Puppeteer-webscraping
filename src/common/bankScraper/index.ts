import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, executablePath, Page } from 'puppeteer';
import { Institutions } from '../enums';

puppeteer.use(stealthPlugin());

@Injectable()
export default class Scraper {
  institution: Institutions;
  browser: Browser;
  page: Page;

  constructor() {}

  public async initBrowser(pageUrl: string): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        executablePath: executablePath(),
      });

      this.page = await this.browser.newPage();
      await this.page.goto(pageUrl);
    } catch (error) {
      Logger.error(error);
    }
  }

  async handleAlerts(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
  }
}
