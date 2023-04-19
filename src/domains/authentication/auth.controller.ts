import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiGrouping } from '../../common/enums';
import { generateControllerPath } from '../../common/utils/modifiers';
import AuthService from './auth.service';
import { LoginDto, OtpDto, VerifyOtpQUeryParams } from './auth.dto';

@Controller({
  path: generateControllerPath({ group: ApiGrouping.AUTH }),
})
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginBody: LoginDto) {
    const data = this.authService.login(loginBody);
    return data;
  }

  @Post('/otp')
  @HttpCode(HttpStatus.OK)
  verifyOtp(
    @Body() otpBody: OtpDto,
    @Query() queryParams: VerifyOtpQUeryParams,
  ) {
    const data = this.authService.verifyOtp({
      otp: otpBody.otp,
      authId: queryParams.authId,
    });
    return data;
  }
}
