import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis'; // ✅ use `* as` — correct for latest version

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      store: redisStore,
      host: configService.get('REDIS_HOST'),
      port: parseInt(configService.get('REDIS_PORT')),
      db: 0,
      ttl: 0,
    };
  },
  inject: [ConfigService],
};
