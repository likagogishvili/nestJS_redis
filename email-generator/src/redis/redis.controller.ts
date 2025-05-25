import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisService } from './redis.service';

@ApiTags('Redis')
@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}
}
