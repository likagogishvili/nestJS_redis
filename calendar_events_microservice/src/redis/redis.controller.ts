import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RedisService } from './redis.service';

@ApiTags('Redis')
@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}
  @Get('/keys')
  @ApiOperation({ summary: 'Get all Redis keys' })
  async getKeys() {
    return this.redisService.getKeys();
  }
}
