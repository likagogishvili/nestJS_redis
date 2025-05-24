import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('CALENDAR_SERVICE') private readonly calendarClient: ClientProxy,
  ) {}

  private readonly redisClient = new Redis({ host: '127.0.0.1', port: 6379 });

  async setData(key: string, data: any) {
    await this.redisClient.set(key, JSON.stringify(data));
    this.calendarClient.emit('createCustomer', {
      data,
    });

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
