import { TransactionType } from 'src/common/enums';

export type HandleOtpVerificationPayload = {
  email: string;
  password: string;
  otp: string;
};

export type AccountDetails = {
  accountName: string;
  accountNumber: string;
  accountBalance: string;
  ledgerBalance: string;
  currency: string;
};

export type CustomerDetails = {
  address: string;
  bvn: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type TransactionPagesDetail = {
  from: number;
  to: number;
  totalPages: number;
};

export type TransactionData = {
  type: string;
  date: string;
  description: string;
  amount: string;
  beneficiary: string;
  sender: string;
};

export type GetTransactionsResponse = {
  from: number;
  to: number;
  totalPages: number;
  transactions: TransactionData[];
};
