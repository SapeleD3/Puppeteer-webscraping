import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Env } from './common/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoBaseUrl } from './common/constants';
import AuthModule from './domains/authentication/auth.module';

@Module({
  imports: [
    AuthModule,
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
