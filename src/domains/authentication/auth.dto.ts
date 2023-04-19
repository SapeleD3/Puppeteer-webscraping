export class LoginDto {
  email: string;
  password: string;
}

export class OtpDto {
  otp: string;
}

export class VerifyOtpQUeryParams {
  authId: string;
}
