import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { LoginDto, OtpDto } from './auth.dto';
import ScrapeBankOfOkra from 'src/common/bankScraper/institutions/okra';
import { VerifyOtpPayload } from './types';
import Formatter from 'src/common/formatter.service';
import { Institutions } from 'src/common/enums';
import { FormattedAuthData } from 'src/common/formatter.dto';
import CustomersService from '../customers/customers.service';
import AccountsService from '../accounts/accounts.service';

const currencyMap = {
  $: 'USD',
  '₦': 'NGN',
};
@Injectable()
export default class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<AuthDocument>,
    private readonly okraScraper: ScrapeBankOfOkra,
    private readonly formatter: Formatter,
    private readonly customersService: CustomersService,
    private readonly accountsService: AccountsService,
  ) {}

  async create(createAuthDto: FormattedAuthData): Promise<AuthDocument> {
    const createdCat = new this.authModel(createAuthDto);
    return createdCat.save();
  }

  async findAll(): Promise<Auth[]> {
    return this.authModel.find().exec();
  }

  async find(props: FilterQuery<AuthDocument>): Promise<AuthDocument> {
    return this.authModel.findOne(props).exec();
  }

  async login(payload: LoginDto) {
    const errorMessage = await this.okraScraper.handleLogin(payload);
    if (Boolean(errorMessage)) {
      await this.okraScraper.closeBrowser();
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const authUser = await this.find({ email: payload.email });
    let authId = authUser?._id;

    if (!authUser) {
      const authData = this.formatter.authFormatter(payload);
      const createdAuth = await this.create(authData);
      authId = createdAuth._id;
    }

    await this.okraScraper.closeBrowser();

    return {
      data: {
        authId: authUser._id,
      },
      message: 'Login successful please input otp',
    };
  }

  async verifyOtp(payload: VerifyOtpPayload) {
    const { otp, authId } = payload;
    const authUser = await this.find({ _id: authId });

    if (!authUser) {
      throw new HttpException('invalid auth id', HttpStatus.BAD_REQUEST);
    }

    const errorMessage = await this.okraScraper.handleOtpVerification({
      email: authUser.email,
      password: authUser.password,
      otp,
    });

    if (Boolean(errorMessage)) {
      await this.okraScraper.closeBrowser();
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const [customerDetails, accountsDetails] = await Promise.all([
      this.okraScraper.getCustomerDetails(),
      this.okraScraper.getAccountDetails(),
    ]);

    await this.okraScraper.closeBrowser();

    const existingCustomer = await this.customersService.find({
      email: customerDetails.email,
    });
    let customerId = existingCustomer?._id.toString();
    if (!existingCustomer) {
      const customerData = this.formatter.customerFormatter({
        address: customerDetails?.address,
        bvn: customerDetails?.bvn,
        phoneNumber: customerDetails?.phone,
        email: customerDetails?.email,
        firstName: customerDetails?.firstName,
        lastName: customerDetails?.lastName,
        authId,
      });
      const createdCustomer = await this.customersService.create(customerData);
      customerId = createdCustomer._id.toString();
    }

    const createAccountPromise = [];

    for (const accountsDetail of accountsDetails) {
      const account = await this.accountsService.find({
        accountNumber: accountsDetail.accountNumber,
      });

      if (!account) {
        const accountData = this.formatter.accountsFormatter({
          accountName: accountsDetail?.accountName,
          accountNumber: accountsDetail?.accountNumber,
          balance: accountsDetail.accountBalance,
          ledgerBalance: accountsDetail.ledgerBalance,
          currency: currencyMap[accountsDetail.currency],
          customerId,
        });
        createAccountPromise.push(this.accountsService.create(accountData));
      }
    }

    await Promise.all(createAccountPromise);

    return {
      data: {},
      message: 'Otp verification successful',
    };
  }
}
