import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { MS_Account, AccountDocument } from './accounts.schema';
import { FormattedAccounstData } from 'src/common/formatter.dto';

@Injectable()
export default class AccountsService {
  constructor(
    @InjectModel(MS_Account.name)
    private accountModel: Model<AccountDocument>,
  ) {}

  async create(
    createAccountDto: FormattedAccounstData,
  ): Promise<AccountDocument> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async findAll(): Promise<MS_Account[]> {
    return this.accountModel.find().exec();
  }

  async find(props: FilterQuery<AccountDocument>): Promise<AccountDocument> {
    return this.accountModel.findOne(props).populate('customerId').exec();
  }
}
