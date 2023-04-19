import { Module } from '@nestjs/common';
import AccountsService from './accounts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './accounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [],
  providers: [AccountsService],
  exports: [AccountsService],
})
export default class AccountsModule {}
