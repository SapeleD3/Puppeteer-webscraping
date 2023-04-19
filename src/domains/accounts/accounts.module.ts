import { Module } from '@nestjs/common';
import AccountsService from './accounts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MS_Account, AccountSchema } from './accounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MS_Account.name, schema: AccountSchema },
    ]),
  ],
  controllers: [],
  providers: [AccountsService],
  exports: [AccountsService],
})
export default class AccountsModule {}
