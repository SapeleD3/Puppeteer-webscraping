import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { LoginDto, OtpDto } from './auth.dto';

@Injectable()
export default class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<AuthDocument>,
  ) {}

  async create(createAuthDto: any): Promise<Auth> {
    const createdCat = new this.authModel(createAuthDto);
    return createdCat.save();
  }

  async findAll(): Promise<Auth[]> {
    return this.authModel.find().exec();
  }

  async find(props: any): Promise<Auth> {
    return this.authModel.findOne(props).exec();
  }

  async login(payload: LoginDto) {}

  async verifyOtp(payload: OtpDto) {}
}
