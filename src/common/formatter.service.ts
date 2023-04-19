import { Injectable } from '@nestjs/common';
import {
  FormattedAccounstData,
  FormattedAuthData,
  FormattedCustomerData,
} from './formatter.dto';

// minimalistic standardized formatter
@Injectable()
export default class Formatter {
  authFormatter(payload: FormattedAuthData): FormattedAuthData {
    return payload;
  }
  customerFormatter(payload: FormattedCustomerData) {
    return payload;
  }

  accountsFormatter(payload: FormattedAccounstData) {
    return payload;
  }

  transactionsFormatter(payload: any) {
    return payload;
  }
}
