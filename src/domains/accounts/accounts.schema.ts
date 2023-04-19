import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import BaseSchema from 'src/common/base.schema';
import { AccountsMeta } from 'src/common/types';
import { Customers } from '../customers/customers.schema';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account extends BaseSchema {
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Customers.name })
  customerId: Customers;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
