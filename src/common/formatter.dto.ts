import { TransactionType } from './enums';
import { AccountsMeta } from './types';

export class FormattedAuthData {
  email: string;
  password: string;
}

export class FormattedCustomerData {
  address: string;
  bvn: string;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  authId: string;
}

export class FormattedAccounstData {
  accountName: string;
  accountNumber: string;
  balance: string;
  ledgerBalance: string;
  currency: string;
  customerId: string;
}

export class FormattedTransactionData {
  type: TransactionType;
  date: number;
  description: string;
  amount: string;
  beneficiary: string;
  sender: string;
  accountId: string;
}
