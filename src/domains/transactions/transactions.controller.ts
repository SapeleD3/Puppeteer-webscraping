import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { ApiGrouping } from '../../common/enums';
import { generateControllerPath } from '../../common/utils/modifiers';
import TransactionsService from './transactions.service';
import { GetTransactionsByAccountNumberQueryParam } from './transactions.dto';

@Controller({
  path: generateControllerPath({ group: ApiGrouping.TRANSACTIONS }),
})
export default class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  login(
    @Query()
    getTransactionsByAccountNumberQueryParam: GetTransactionsByAccountNumberQueryParam,
  ) {
    const data = this.transactionService.getTransactionByAccountNumber(
      getTransactionsByAccountNumberQueryParam,
    );
    return data;
  }
}
