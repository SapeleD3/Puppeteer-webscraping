import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import ScrapeBankOfOkra from 'src/common/bankScraper/institutions/okra';
import Formatter from 'src/common/formatter.service';
import CustomersService from '../customers/customers.service';
import CustomersModule from '../customers/customers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    CustomersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ScrapeBankOfOkra, Formatter],
  exports: [AuthService],
})
export default class AuthModule {}
