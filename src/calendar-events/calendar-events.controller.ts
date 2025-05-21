import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CalendarEventsService } from './calendar-events.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';

@Controller()
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) {}

  @MessagePattern('createCalendarEvent')
  create(@Payload() createCalendarEventDto: CreateCalendarEventDto) {
    return this.calendarEventsService.create(createCalendarEventDto);
  }

  @MessagePattern('findAllCalendarEvents')
  findAll() {
    return this.calendarEventsService.findAll();
  }

  @MessagePattern('findOneCalendarEvent')
  findOne(@Payload() id: number) {
    return this.calendarEventsService.findOne(id);
  }

  @MessagePattern('updateCalendarEvent')
  update(@Payload() updateCalendarEventDto: UpdateCalendarEventDto) {
    return this.calendarEventsService.update(updateCalendarEventDto.id, updateCalendarEventDto);
  }

  @MessagePattern('removeCalendarEvent')
  remove(@Payload() id: number) {
    return this.calendarEventsService.remove(id);
  }
}
