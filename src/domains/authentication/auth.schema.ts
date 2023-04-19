import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import BaseSchema from '../../common/base.schema';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth extends BaseSchema {
  @Prop()
  email: string;

  @Prop()
  password: number;

  @Prop()
  browserPage: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
