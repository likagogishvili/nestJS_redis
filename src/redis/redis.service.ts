import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RedisDataDto } from './dto/redis-data.dto';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getData(): Promise<RedisDataDto | undefined> {
    const value = await this.cacheManager.get<RedisDataDto>('key');
    return value;
  }

  async postData(createDataDto: RedisDataDto) {
    await this.cacheManager.set('key', createDataDto);
    return { message: 'Data stored successfully' };
  }

  async deleteData() {
    await this.cacheManager.del('key');
    return { message: 'Data deleted successfully' };
  }
}
