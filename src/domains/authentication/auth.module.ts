import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MS_Auth, AuthSchema } from './auth.schema';
import ScrapeBankOfOkra from 'src/common/bankScraper/institutions/okra';
import Formatter from 'src/common/formatter.service';
import CustomersModule from '../customers/customers.module';
import AccountsModule from '../accounts/accounts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MS_Auth.name, schema: AuthSchema }]),
    CustomersModule,
    AccountsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ScrapeBankOfOkra, Formatter],
  exports: [AuthService],
})
export default class AuthModule {}
