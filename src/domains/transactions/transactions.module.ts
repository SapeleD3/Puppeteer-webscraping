import { Module } from '@nestjs/common';
import TransactionsService from './transactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionsSchema } from './transactions.schema';
import TransactionsController from './transactions.controller';
import AuthModule from '../authentication/auth.module';
import AccountsModule from '../accounts/accounts.module';
import ScrapeBankOfOkra from 'src/common/bankScraper/institutions/okra';
import Formatter from 'src/common/formatter.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionsSchema },
    ]),
    AuthModule,
    AccountsModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, ScrapeBankOfOkra, Formatter],
  exports: [TransactionsService],
})
export default class TransactionssModule {}
