import { Prop, Schema } from '@nestjs/mongoose';
import dayjs from 'dayjs';
import { Institutions } from './enums';

@Schema()
export default class BaseSchema {
  @Prop({ default: dayjs().unix() })
  createdAt: number;

  @Prop({ default: dayjs().unix() })
  updatedAt: number;

  @Prop({ default: false })
  archived: boolean;

  @Prop({ default: Institutions.OKRA })
  institution: Institutions;
}
