import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { RedisOptions } from './redis/constants/redis-options.constants';
import { RedisModule } from './redis/redis.module';
import { SendEmailModule } from './send-email/send-email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    RedisModule,
    SendEmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
