import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model, Types } from 'mongoose';
import { Transaction, TransactionsDocument } from './transactions.schema';
import AuthService from '../authentication/auth.service';
import { GetTransactionsByAccountNumberQueryParam } from './transactions.dto';
import AccountsService from '../accounts/accounts.service';
import ScrapeBankOfOkra from 'src/common/bankScraper/institutions/okra';
import { FormattedTransactionData } from 'src/common/formatter.dto';
import Formatter from 'src/common/formatter.service';
import { TransactionType } from 'src/common/enums';
import dayjs from 'dayjs';

@Injectable()
export default class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionsDocument>,
    private readonly authService: AuthService,
    private readonly accountService: AccountsService,
    private readonly okraScraper: ScrapeBankOfOkra,
    private readonly formatter: Formatter,
  ) {}

  async create(
    createTransactionDto: FormattedTransactionData,
  ): Promise<TransactionsDocument> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return createdTransaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async find(
    props: FilterQuery<TransactionsDocument>,
  ): Promise<TransactionsDocument> {
    return this.transactionModel.findOne(props).exec();
  }

  async getTransactionByAccountNumber({
    otp,
    accountNumber,
  }: GetTransactionsByAccountNumberQueryParam) {
    const account = await this.accountService.find({ accountNumber });
    let authId = account?.customerId?.authId as unknown;
    authId = authId as Types.ObjectId;

    const authUser = await this.authService.find({ _id: authId.toString() });

    if (!authUser) {
      throw new HttpException('invalid auth id', HttpStatus.BAD_REQUEST);
    }

    const errorMessage = await this.okraScraper.handleOtpVerification({
      email: authUser.email,
      password: String(authUser.password),
      otp,
    });

    if (Boolean(errorMessage)) {
      await this.okraScraper.closeBrowser();
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const transactions = await this.okraScraper.getTransactionsByAccounts(
      accountNumber,
    );
    await this.okraScraper.closeBrowser();

    const transactionCreationPromise = [];

    for (const transaction of transactions.transactions) {
      const transactionData = this.formatter.transactionsFormatter({
        accountId: account._id.toString(),
        type: transaction.type as TransactionType,
        date: dayjs(transaction.date).unix(),
        description: transaction.description,
        beneficiary: transaction.beneficiary,
        sender: transaction.sender,
        amount: transaction.amount,
      });

      transactionCreationPromise.push(this.create(transactionData));
    }

    await Promise.all(transactionCreationPromise);

    return {
      data: transactions,
      message: 'Transactions scraped successful',
    };
  }
}
