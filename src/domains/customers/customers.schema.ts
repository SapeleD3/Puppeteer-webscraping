import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import BaseSchema from 'src/common/base.schema';
import { MS_Auth } from '../authentication/auth.schema';

export type CustomersDocument = HydratedDocument<MS_Customers>;

@Schema()
export class MS_Customers extends BaseSchema {
  @Prop()
  address: string;

  @Prop()
  bvn: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MS_Auth.name })
  authId: MS_Auth;
}

export const CustomerSchema = SchemaFactory.createForClass(MS_Customers);
