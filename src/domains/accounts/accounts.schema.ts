import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import BaseSchema from 'src/common/base.schema';
import { MS_Customers } from '../customers/customers.schema';

export type AccountDocument = HydratedDocument<MS_Account>;

@Schema()
export class MS_Account extends BaseSchema {
  @Prop()
  accountName: string;

  @Prop({ index: true })
  accountNumber: string;

  @Prop()
  balance: string;

  @Prop()
  ledgerBalance: string;

  @Prop()
  currency: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MS_Customers.name })
  customerId: MS_Customers;
}

export const AccountSchema = SchemaFactory.createForClass(MS_Account);
