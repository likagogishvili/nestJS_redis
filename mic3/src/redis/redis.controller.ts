import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RedisService } from './redis.service';
import { CreateRedisDto } from './dto/create-redi.dto';
import { RedisDataDto } from './dto/redis-data.dto';

@ApiTags('Redis')
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
  async getData(): Promise<RedisDataDto | null> {
    try {
      return await this.redisService.getData();
    } catch (error) {
      console.error('Error getting data from Redis:', error);
      return null;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Store data in Redis' })
  @ApiResponse({ status: 201, description: 'Stores an object in Redis' })
  async postData(@Body() createDataDto: CreateRedisDto) {
    try {
      return await this.redisService.setData(createDataDto);
    } catch (error) {
      console.error('Error setting data in Redis:', error);
      return { error: 'Failed to store data' };
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete stored data' })
  @ApiResponse({ status: 200, description: 'Deletes stored data in Redis' })
  async deleteData() {
    try {
      return await this.redisService.deleteData();
    } catch (error) {
      console.error('Error deleting data in Redis:', error);
      return { error: 'Failed to delete data' };
    }
  }

  @Get('/keys')
  @ApiOperation({ summary: 'Get all Redis keys' })
  async getKeys() {
    return this.redisService.getKeys();
  }
}
