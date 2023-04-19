import { Page } from 'puppeteer';
import { Institutions } from '../enums';
import { LoginDto } from 'src/domains/authentication/auth.dto';

export interface BankScraper {
  institution: Institutions;
  page: Page;
  closeBrowser: () => Promise<void>;
  handleLogin: (payload: LoginDto) => Promise<string | void>;
  handleOtpVerification: (payload: LoginDto) => Promise<string | void>;
}
