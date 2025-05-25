import { ApiProperty } from '@nestjs/swagger';

export class CreateRedisDto {
  @ApiProperty({
    example: 'mykey:123',
    description: 'Redis key to store under',
  })
  key: string;

  @ApiProperty()
  data: Record<string, any>;
}
