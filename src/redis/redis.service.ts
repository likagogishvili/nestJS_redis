import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisDataDto } from './dto/redis-data.dto';

@Injectable()
export class RedisService {
  private readonly redisClient = new Redis({ host: '127.0.0.1', port: 6379 });

  async setData(data: RedisDataDto) {
    await this.redisClient.set('customer', JSON.stringify(data));
    return { message: 'Data stored in Redis' };
  }

  async getData(): Promise<RedisDataDto | null> {
    const value = await this.redisClient.get('customer');
    return value ? JSON.parse(value) : null;
  }

  async deleteData() {
    await this.redisClient.del('customer');
    return { message: 'Data deleted from Redis' };
  }

  async getKeys() {
    const keys = await this.redisClient.keys('*');
    return keys;
  }
}
