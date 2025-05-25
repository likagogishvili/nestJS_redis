import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { redisHostPort } from './constants/redi-port-host';

@Injectable()
export class RedisService {
  private readonly redisClient = new Redis(redisHostPort);

  async setData(key: string, data: any) {
    await this.redisClient.set(key, JSON.stringify(data));
    return { message: `Data stored in Redis under key '${key}'` };
  }

  async getData(key: string): Promise<any> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : null;
  }

  async deleteData(key: string) {
    await this.redisClient.del(key);
    return { message: `Key '${key}' deleted from Redis` };
  }

  async getKeys() {
    return this.redisClient.keys('*');
  }
}
