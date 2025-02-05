import { Inject, Injectable } from '@nestjs/common';
import { CreateRediDto } from './dto/create-redi.dto';
import { UpdateRediDto } from './dto/update-redi.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getData(): Promise<string | undefined> {
    const value = await this.cacheManager.get<string>('key');
    return value;
  }

  async postData(createDataDto: any) {
    const { value } = createDataDto;
    await this.cacheManager.set('key', value);
  }
  async deleteData() {
    await this.cacheManager.del('key');
  }
}
