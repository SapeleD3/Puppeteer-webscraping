import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Env } from './common/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoBaseUrl } from './common/constants';
import AuthModule from './domains/authentication/auth.module';
import { ExceptionFilterModule } from './common/exceptions';
import CustomersModule from './domains/customers/customers.module';

@Module({
  imports: [
    AuthModule,
    CustomersModule,
    ExceptionFilterModule,
    ConfigModule.forRoot({
      load: [Env],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: ['.env'],
    }),

    //databases
    MongooseModule.forRoot(mongoBaseUrl),
  ],
  providers: [],
})
export class AppModule {}
