import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from 'src/redis/redis.service';
import { CreateSendEmailDto } from './dto/create-send-email.dto';

@Injectable()
export class SendEmailService {
  constructor(private readonly redisService: RedisService) {}

  async create(createSendEmailDto: CreateSendEmailDto) {
    const id = uuidv4();
    const key = `sendEmail:${id}`;
    const data = { id, ...createSendEmailDto };

    await this.redisService.setData(key, data);

    return {
      message: 'Email data stored in Redis',
      key,
      id,
    };
  }

  async getAllEmailKeys() {
    return this.redisService.getKeys('sendEmail:*');
  }
}
