import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import BaseSchema from '../../common/base.schema';

export type AuthDocument = HydratedDocument<MS_Auth>;

@Schema()
export class MS_Auth extends BaseSchema {
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(MS_Auth);
