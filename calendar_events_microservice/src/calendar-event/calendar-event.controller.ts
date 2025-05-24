import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CalendarEventService } from './calendar-event.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';

@Controller()
export class CalendarEventController {
  constructor(private readonly calendarEventService: CalendarEventService) {}

  @MessagePattern('createCalendarEvent')
  create(@Payload() dto: CreateCalendarEventDto) {
    return this.calendarEventService.create(dto);
  }

  @MessagePattern('findAllCalendarEvent')
  findAll() {
    return this.calendarEventService.findAll();
  }

  @MessagePattern('findOneCalendarEvent')
  findOne(@Payload() id: string) {
    return this.calendarEventService.findOne(id);
  }

  @MessagePattern('updateCalendarEvent')
  update(@Payload() dto: UpdateCalendarEventDto) {
    return this.calendarEventService.update(dto.id, dto);
  }

  @MessagePattern('removeCalendarEvent')
  remove(@Payload() id: string) {
    return this.calendarEventService.remove(id);
  }
  @MessagePattern('createCustomer')
  handleCreateCustomer(@Payload() customer: any) {
    const event: CreateCalendarEventDto = {
      title: `💕 Welcome ${customer.data.name}`,
      description: `Auto-created event for ${customer.data.name} ${customer.data.lastName}`,
      date: new Date().toISOString(),
      customerId: customer.data.id,
    };
    return this.calendarEventService.create(event);
  }
}
