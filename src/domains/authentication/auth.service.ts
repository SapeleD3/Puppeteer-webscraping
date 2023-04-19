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

@Injectable()
export default class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<AuthDocument>,
    private readonly okraScraper: ScrapeBankOfOkra,
    private readonly formatter: Formatter,
    private readonly customersService: CustomersService,
  ) {}

  async create(createAuthDto: FormattedAuthData): Promise<Auth> {
    const createdCat = new this.authModel(createAuthDto);
    return createdCat.save();
  }

  async findAll(): Promise<Auth[]> {
    return this.authModel.find().exec();
  }

  async find(props: FilterQuery<AuthDocument>): Promise<Auth> {
    return this.authModel.findOne(props).exec();
  }

  async login(payload: LoginDto) {
    const errorMessage = await this.okraScraper.handleLogin(payload);
    if (Boolean(errorMessage)) {
      await this.okraScraper.closeBrowser();
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const user = await this.find({ email: payload.email });

    if (!user) {
      const authData = this.formatter.authFormatter(payload);
      this.create(authData);
    }

    await this.okraScraper.closeBrowser();

    return {
      data: null,
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

    const customerDetails = await this.okraScraper.getCustomerDetails();
    const customerExists = await this.customersService.find({
      email: customerDetails.email,
    });

    if (!customerExists) {
      const customerData = this.formatter.customerFormatter({
        address: customerDetails?.address,
        bvn: customerDetails?.bvn,
        phoneNumber: customerDetails?.phone,
        email: customerDetails?.email,
        firstName: customerDetails?.firstName,
        lastName: customerDetails?.lastName,
        authId,
      });
      await this.customersService.create(customerData);
    }

    await this.okraScraper.closeBrowser();

    return {
      data: {},
      message: 'Otp verification successful',
    };
  }
}
