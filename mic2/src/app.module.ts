import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { RedisOptions } from './redis/constants/redis-options.constants';
import { CalendarEventModule } from './calendar-event/calendar-event.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    CalendarEventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
