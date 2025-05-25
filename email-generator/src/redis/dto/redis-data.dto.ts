import { ApiProperty } from '@nestjs/swagger';

export class RedisDataDto {
  @ApiProperty({ example: 'customer:uuid123' })
  key: string;
}
