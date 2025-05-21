import { Test, TestingModule } from '@nestjs/testing';
import { CalendarEventsController } from './calendar-events.controller';
import { CalendarEventsService } from './calendar-events.service';

describe('CalendarEventsController', () => {
  let controller: CalendarEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarEventsController],
      providers: [CalendarEventsService],
    }).compile();

    controller = module.get<CalendarEventsController>(CalendarEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
