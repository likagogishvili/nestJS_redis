import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { SendEmailController } from './send-email.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [SendEmailController],
  providers: [SendEmailService],
})
export class SendEmailModule {}
