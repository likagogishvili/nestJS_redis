import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RedisService } from './redis.service';
import { CreateRediDto } from './dto/create-redi.dto';
import { UpdateRediDto } from './dto/update-redi.dto';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  @CacheKey('custom_key')
  @CacheTTL(20)
  async getData() {
    try {
      return await this.redisService.getData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  @Post()
  async postData(@Body() createDataDto: any) {
    try {
      return await this.redisService.postData(createDataDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  @Delete()
  async deleteData() {
    try {
      return await this.redisService.deleteData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
