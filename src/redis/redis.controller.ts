import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RedisService } from './redis.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CreateRedisDto } from './dto/create-redi.dto';
import { RedisDataDto } from './dto/redis-data.dto';

@ApiTags('Redis') // Group routes under "Redis" in Swagger
@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  @ApiOperation({ summary: 'Get stored data' })
  @ApiResponse({
    status: 200,
    description: 'Returns stored Redis data',
    type: RedisDataDto,
  })
  @CacheKey('custom_key')
  @CacheTTL(20)
  async getData(): Promise<RedisDataDto | undefined> {
    try {
      return await this.redisService.getData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Store data in Redis' })
  @ApiResponse({ status: 201, description: 'Stores an object in Redis' })
  async postData(@Body() createDataDto: CreateRedisDto) {
    try {
      return await this.redisService.postData(createDataDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete stored data' })
  @ApiResponse({ status: 200, description: 'Deletes stored data in Redis' })
  async deleteData() {
    try {
      return await this.redisService.deleteData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
