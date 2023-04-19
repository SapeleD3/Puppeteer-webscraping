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
