import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Account, AccountDocument } from './accounts.schema';
import { FormattedAccounstData } from 'src/common/formatter.dto';
import { Customers } from '../customers/customers.schema';

@Injectable()
export default class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<AccountDocument>,
  ) {}

  async create(
    createAccountDto: FormattedAccounstData,
  ): Promise<AccountDocument> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async find(props: FilterQuery<AccountDocument>): Promise<AccountDocument> {
    return this.accountModel.findOne(props).populate('customerId').exec();
  }
}
