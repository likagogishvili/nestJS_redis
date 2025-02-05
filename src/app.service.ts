import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getTXT() {
    return 'USING REDIS IN NESTJS';
  }
}
