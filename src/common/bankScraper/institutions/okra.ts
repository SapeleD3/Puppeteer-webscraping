import { Injectable, Logger } from '@nestjs/common';
import Scraper from '../index';
import { BankScraper } from '../interface';
import { Institutions } from 'src/common/enums';
import { LoginDto } from 'src/domains/authentication/auth.dto';
import {
  AccountDetails,
  CustomerDetails,
  HandleOtpVerificationPayload,
} from './types';

@Injectable()
export default class ScrapeBankOfOkra extends Scraper implements BankScraper {
  institution: Institutions.OKRA;
  private BASE_URL = 'https://bankof.okra.ng';
  private LOGIN_PATH = '/login';

  async handleFormErrors(): Promise<string> {
    const errorMessageClassName =
      '.font-bold.text-sm.text-center.text-red-500.mb-3.mt-2';
    let spanContent = '';
    try {
      await this.page.waitForSelector(errorMessageClassName, { timeout: 1000 });

      spanContent = await this.page.$eval(errorMessageClassName, (span) => {
        return span.textContent || null;
      });
    } catch (error) {
      Logger.log('Span element not found within 1 seconds.');
    }

    return spanContent;
  }

  async handleLogin(payload: LoginDto) {
    await this.initBrowser(this.BASE_URL + this.LOGIN_PATH);
    this.page.waitForSelector('[type="submit"]');
    // we are curently in the login page
    await this.page.type('#email', payload.email);
    await this.page.type('#password', payload.password);
    await this.page.click('[type="submit"]');
    const spanContent = await this.handleFormErrors();

    if (spanContent) {
      return spanContent;
    }

    this.handleAlerts();
    await this.page.waitForNavigation();
  }

  async handleOtpVerification(payload: HandleOtpVerificationPayload) {
    const { email, password, otp } = payload;
    const loginResponse = await this.handleLogin({ email, password });
    if (Boolean(loginResponse)) {
      return loginResponse;
    }
    // we are curently in the otp page
    await this.page.type('#otp', otp);
    await this.page.click('[type="submit"]');
    const spanContent = await this.handleFormErrors();
    if (spanContent) {
      return spanContent;
    }
  }

  async getCustomerDetails(): Promise<CustomerDetails> {
    const greetingsClassName = 'h1.text-2xl.font-semibold.text-gray-800';

    await this.page.waitForSelector(greetingsClassName);
    const spanContent = await this.page.$eval(greetingsClassName, (data) => {
      return data ? data.textContent : null;
    });

    const divContent: any = await this.page.$eval('div', (div) => {
      const paragraphs = Array.from(
        div.querySelectorAll('p.text-default.my-3'),
      );
      return paragraphs.reduce((agg: Record<string, string>, p: Element) => {
        const label = p.querySelector(
          'span.text-lg.font-extrabold',
        )?.textContent;
        const value = p.textContent?.replace(label, '').trim();
        const key = label.replace(':', '').toLowerCase();
        agg[key] = value;

        return agg;
      }, {});
    });

    const [firstName, lastName] = spanContent
      .replace('!', '')
      .split('Welcome back ')[1]
      .split(' ');

    return {
      ...divContent,
      firstName,
      lastName,
    };
  }

  async getAccountDetails() {
    try {
      await this.page.waitForSelector('section', { timeout: 2000 });
    } catch (error) {
      Logger.log('Account Details not found within 2 seconds.');
    }

    const accountInfo = await this.page.$$eval('section', (sections) => {
      return sections.reduce(
        (agg: Record<string, AccountDetails>, section: Element) => {
          const accountName = section.querySelector('h3')?.textContent;
          const accountBalance = section
            .querySelector('p.text-4xl.my-2.font-bold')
            ?.textContent?.trim();
          const ledgerBalance = section
            .querySelector('p:not(.text-4xl.my-2.font-bold)')
            ?.textContent?.trim();
          const currency = accountBalance.split(' ')[0];
          const accountNumber = section
            .querySelector('a[href^="/account-"]')
            ?.getAttribute('href')
            ?.replace('/account-', '');

          agg[accountName] = {
            accountName,
            accountNumber,
            accountBalance: accountBalance.split(' ')[1],
            ledgerBalance: ledgerBalance.split(' ')[1],
            currency,
          };

          return agg;
        },
        {},
      );
    });
    return Object.values(accountInfo);
  }
}
