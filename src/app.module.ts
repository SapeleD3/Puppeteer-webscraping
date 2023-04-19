import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Env } from './common/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Env],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
