import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import BaseSchema from 'src/common/base.schema';
import { TransactionType } from 'src/common/enums';
import { MS_Account } from '../accounts/accounts.schema';

export type TransactionsDocument = HydratedDocument<MS_Transaction>;

@Schema()
export class MS_Transaction extends BaseSchema {
  @Prop()
  type: TransactionType;

  @Prop()
  date: number;

  @Prop()
  description: string;

  @Prop()
  amount: string;

  @Prop()
  beneficiary: string;

  @Prop()
  sender: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MS_Account.name })
  accountId: string;
}

export const TransactionsSchema = SchemaFactory.createForClass(MS_Transaction);
