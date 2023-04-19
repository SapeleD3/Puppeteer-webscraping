import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Customers, CustomersDocument } from './customers.schema';
import { FormattedCustomerData } from 'src/common/formatter.dto';

@Injectable()
export default class CustomersService {
  constructor(
    @InjectModel(Customers.name)
    private customerModel: Model<CustomersDocument>,
  ) {}

  async create(createCustomerDto: FormattedCustomerData): Promise<Customers> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  async findAll(): Promise<Customers[]> {
    return this.customerModel.find().exec();
  }

  async find(props: FilterQuery<CustomersDocument>): Promise<Customers> {
    return this.customerModel.findOne(props).exec();
  }
}
