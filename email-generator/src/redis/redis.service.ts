import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisDataDto } from './dto/redis-data.dto';
import { redisHostPort, ttlSeconds } from './constants/redi-port-host';

@Injectable()
export class RedisService {
  private readonly redisClient = new Redis(redisHostPort);

  async setData(key: string, data: any) {
    await this.redisClient.set(key, JSON.stringify(data), 'EX', ttlSeconds);
    return { message: `Data stored in Redis under key '${key}'` };
  }

  async getData(): Promise<RedisDataDto | null> {
    const value = await this.redisClient.get('customer');
    return value ? JSON.parse(value) : null;
  }

  async deleteData() {
    await this.redisClient.del('customer');
    return { message: 'Data deleted from Redis' };
  }

  async getKeys(pattern = '*'): Promise<string[]> {
    return this.redisClient.keys(pattern);
  }
}
