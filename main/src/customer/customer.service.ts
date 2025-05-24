import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CustomerService {
  constructor(private readonly redisService: RedisService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const id = uuidv4();
    const key = `customer:${id}`;
    const data = { ...createCustomerDto, id };
    await this.redisService.setData(key, data);
    return {
      message: 'Customer created and stored in Redis',
      id,
    };
  }

  async findOne(id: string) {
    const key = `customer:${id}`;
    const customer = await this.redisService.getData(key);
    return customer || { message: `Customer ${id} not found` };
  }

  async findAll() {
    const keys = await this.redisService.getKeys();
    const customerKeys = keys.filter((key) => key.startsWith('customer:'));
    const customers = await Promise.all(
      customerKeys.map((key) => this.redisService.getData(key)),
    );
    return customers;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const key = `customer:${id}`;
    const existing = await this.redisService.getData(key);
    if (!existing) return { message: `Customer ${id} not found` };

    const updated = { ...existing, ...updateCustomerDto };
    await this.redisService.setData(key, updated);
    return { message: `Customer ${id} updated` };
  }

  async remove(id: number) {
    const key = `customer:${id}`;
    return this.redisService.deleteData(key);
  }
}
