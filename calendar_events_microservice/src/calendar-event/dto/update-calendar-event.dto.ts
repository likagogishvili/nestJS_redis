import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarEventDto } from './create-calendar-event.dto';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCalendarEventDto extends PartialType(
  CreateCalendarEventDto,
) {
  @ApiProperty({ description: 'Calendar event ID (UUID)' })
  @IsUUID()
  id: string;
}
