import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CalendarEventService {
  constructor(private readonly redisService: RedisService) {}

  async create(dto: CreateCalendarEventDto) {
    const id = uuidv4();
    const key = `calendarEvent:${id}`;
    const event = { id, ...dto };
    await this.redisService.setData(key, event);
    return { message: 'Event created', event };
  }

  async findAll() {
    const keys = await this.redisService.getKeys();
    const eventKeys = keys.filter((k) => k.startsWith('calendarEvent:'));
    return Promise.all(eventKeys.map((key) => this.redisService.getData(key)));
  }

  async findOne(id: string) {
    const key = `calendarEvent:${id}`;
    const event = await this.redisService.getData(key);
    return event || { message: `Event ${id} not found` };
  }

  async update(id: string, dto: UpdateCalendarEventDto) {
    const key = `calendarEvent:${id}`;
    const existing = await this.redisService.getData(key);
    if (!existing) return { message: `Event ${id} not found` };

    const updated = { ...existing, ...dto };
    await this.redisService.setData(key, updated);
    return { message: `Event ${id} updated`, event: updated };
  }

  async remove(id: string) {
    const key = `calendarEvent:${id}`;
    const deleted = await this.redisService.getData(key);
    if (!deleted) return { message: `Event ${id} not found` };

    await this.redisService.deleteData(key);
    return { message: `Event ${id} removed`, deleted };
  }
}
