import { Global, Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import HttpExceptionsFilter from './http-exception.filter';
import AllExceptionsFilter from './all-exception.filter';

@Global()
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    {
      provide: Symbol(),
      useClass: Logger,
    },
  ],
})
export default class ExceptionFilterModule {}
