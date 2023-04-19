import { Module } from '@nestjs/common';
import CustomersService from './customers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema, Customers } from './customers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customers.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [],
  providers: [CustomersService],
  exports: [CustomersService],
})
export default class CustomersModule {}
