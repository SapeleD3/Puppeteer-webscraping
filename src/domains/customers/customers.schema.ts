import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import BaseSchema from 'src/common/base.schema';
import { Auth } from '../authentication/auth.schema';

export type CustomersDocument = HydratedDocument<Customers>;

@Schema()
export class Customers extends BaseSchema {
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Auth.name })
  authId: Auth;
}

export const CustomerSchema = SchemaFactory.createForClass(Customers);
