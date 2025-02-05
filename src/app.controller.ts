import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTXT() {
    try {
      return await this.appService.getTXT();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
