import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const host = configService.get<string>('REDIS_HOST');
    const port = parseInt(configService.get<string>('REDIS_PORT'), 10);

    console.log(
      `Redis connecting to ${host ?? '[undefined]'}:${port ?? '[undefined]'}`,
    );
    return {
      store: redisStore,
      host,
      port,
      db: 0,
      ttl: 0,
    };
  },
  inject: [ConfigService],
};
